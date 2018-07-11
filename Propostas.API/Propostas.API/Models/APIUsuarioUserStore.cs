using Microsoft.AspNet.Identity;
using Propostas.Lib.Service;
using System;
using System.Threading.Tasks;

namespace Propostas.API.Models
{
    /// <summary>
    /// Class that implements the key ASP.NET Identity user store iterfaces
    /// </summary>
    public class APIUsuarioUserStore : IUserStore<APIUsuarioIdentity>, IUserPasswordStore<APIUsuarioIdentity>
    {
        private readonly UsuarioService service;

        public APIUsuarioUserStore()
        {
            service = new UsuarioService();
        }

        /// <summary>
        /// Insert a new IdentityUser in the UserTable
        /// </summary>
        /// <param name="user"></param>F
        /// <returns></returns>
        public Task CreateAsync(APIUsuarioIdentity user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            return Task.FromResult<object>(null);
        }

        /// <summary>
        /// Returns an IdentityUser instance based on a userId query
        /// </summary>
        /// <param name="userId">The user's Id</param>
        /// <returns></returns>
        public Task<APIUsuarioIdentity> FindByIdAsync(string userId)
        {
            if (string.IsNullOrEmpty(userId))
            {
                throw new ArgumentException(nameof(userId));
            }

            APIUsuarioIdentity result = new APIUsuarioIdentity();

            var usuario = service.Carregar(Convert.ToInt32(userId));
            if (usuario != null)
            {
                result.Id = usuario.ID.ToString();
                result.UserName = usuario.CPF;
                result.PasswordHash = usuario.Senha;
                result.Profile = usuario.Perfil.ToString();
            }

            return Task.FromResult<APIUsuarioIdentity>(result);
        }

        /// <summary>
        /// Returns an IdentityUser instance based on a userName query
        /// </summary>
        /// <param name="cpf">The cpf used to log-in</param>
        /// <returns></returns>
        public Task<APIUsuarioIdentity> FindByNameAsync(string cpf)
        {
            if (string.IsNullOrEmpty(cpf))
            {
                throw new ArgumentException(nameof(cpf));
            }

            APIUsuarioIdentity result = new APIUsuarioIdentity();

            var usuario = service.CarregarPorCPF(cpf);
            if (usuario != null)
            {
                result.Id = usuario.ID.ToString();
                result.UserName = usuario.CPF;
                result.PasswordHash = usuario.Senha;
                result.Profile = usuario.Perfil.ToString();
            }

            return Task.FromResult<APIUsuarioIdentity>(result);
        }

        /// <summary>
        /// Updates the UsersTable with the IdentityUser instance values
        /// </summary>
        /// <param name="user">IdentityUser to be updated</param>
        /// <returns></returns>
        public Task UpdateAsync(APIUsuarioIdentity user)
        {
            return Task.FromResult<object>(null);
        }

        public void Dispose()
        {
        }

        /// <summary>
        /// Deletes a user
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public Task DeleteAsync(APIUsuarioIdentity user)
        {
            return Task.FromResult<Object>(null);
        }

        /// <summary>
        /// Returns the PasswordHash for a given IdentityUser
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public Task<string> GetPasswordHashAsync(APIUsuarioIdentity user)
        {
            string passwordHash = user.PasswordHash;
            return Task.FromResult<string>(passwordHash);
        }

        /// <summary>
        /// Verifies if user has password
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public Task<bool> HasPasswordAsync(APIUsuarioIdentity user)
        {
            var hasPassword = !string.IsNullOrEmpty(user.PasswordHash);
            return Task.FromResult<bool>(hasPassword);
        }

        /// <summary>
        /// Sets the password hash for a given IdentityUser
        /// </summary>
        /// <param name="user"></param>
        /// <param name="passwordHash"></param>
        /// <returns></returns>
        public Task SetPasswordHashAsync(APIUsuarioIdentity user, string passwordHash)
        {
            return Task.FromResult<Object>(null);
        }
    }
}