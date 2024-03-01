using System.Security.Claims;
using API.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

namespace API.Extensions
{
    public static class UserManagerExtensions
    {
        public static async Task<AppUser> FindByUserClaimsPrincipleAddressAsync(this UserManager<AppUser> input,
        ClaimsPrincipal user)
        {
             var email = user.Claims?.FirstOrDefault(x =>x.Type == ClaimTypes.Email)?
            .Value;

            return await input.Users.Include(x => x.Address).SingleOrDefaultAsync(x => x.Email
             == email);
        }

        public static async Task<AppUser> FindByEmailFromClaimsPrinciple(this UserManager<AppUser> input,
        ClaimsPrincipal user)
       {
             var email = user.Claims?.FirstOrDefault(x =>x.Type == ClaimTypes.Email)?
            .Value;

              return await input.Users.SingleOrDefaultAsync(x => x.Email
             == email);
        }
    }
}