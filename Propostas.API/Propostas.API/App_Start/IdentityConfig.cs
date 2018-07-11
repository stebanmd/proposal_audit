using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Propostas.API.Models;

namespace Propostas.API
{
    // Configure the application user manager used in this application. UserManager is defined in ASP.NET Identity and is used by the application.

    public class ApplicationUserManager : UserManager<APIUsuarioIdentity>
    {
        public ApplicationUserManager(IUserStore<APIUsuarioIdentity> store)
            : base(store)
        {
        }

        public static ApplicationUserManager Create(IdentityFactoryOptions<ApplicationUserManager> options, IOwinContext context)
        {
            var manager = new ApplicationUserManager(new APIUsuarioUserStore());
            var dataProtectionProvider = options.DataProtectionProvider;
            if (dataProtectionProvider != null)
            {
                manager.UserTokenProvider = new DataProtectorTokenProvider<APIUsuarioIdentity>(dataProtectionProvider.Create("ASP.NET Identity"));
            }
            return manager;
        }
    }
}