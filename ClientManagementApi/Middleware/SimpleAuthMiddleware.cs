using System.Linq;
using System.Threading.Tasks;
using ClientManagementApi.Services;
using Microsoft.AspNetCore.Http;

namespace ClientManagementApi.Middleware
{
    public class SimpleAuthMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly TokenService _tokenService;

        public SimpleAuthMiddleware(RequestDelegate next, TokenService tokenService)
        {
            _next = next;
            _tokenService = tokenService;
        }

        public async Task Invoke(HttpContext context)
        {
            var path = context.Request.Path.Value ?? "";
            // allow auth endpoints without token
            if (path.StartsWith("/api/auth"))
            {
                await _next(context);
                return;
            }

            // Check Authorization header: "Bearer {token}"
            if (!context.Request.Headers.TryGetValue("Authorization", out var authValues))
            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsync("Missing Authorization header");
                return;
            }

            var auth = authValues.FirstOrDefault();
            if (string.IsNullOrEmpty(auth) || !auth.StartsWith("Bearer "))
            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsync("Invalid Authorization header");
                return;
            }

            var token = auth.Substring("Bearer ".Length);
            var principal = _tokenService.ValidateToken(token);
            if (principal == null)
            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsync("Invalid Token");
                return;
            }

            // attach user to HttpContext
            context.User = principal;

            await _next(context);
        }
    }
}
