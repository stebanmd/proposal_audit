using Microsoft.AspNet.Identity;

namespace Propostas.API.Models
{
    public partial class APIUsuarioIdentity : IUser
    {
        /// <summary>
        /// Default constructor
        /// </summary>
        public APIUsuarioIdentity()
        {
        }

        /// <summary>
        /// Constructor that takes user name as argument
        /// </summary>
        /// <param name="userName"></param>
        public APIUsuarioIdentity(string userName)
            : this() => UserName = userName;

        /// <summary>
        /// User ID
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// User's name
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        /// User's password hash
        /// </summary>
        public string PasswordHash { get; set; }

        /// <summary>
        /// User's security stamp
        /// </summary>
        public string SecurityStamp { get; set; }

        /// <summary>
        /// User's profile
        /// </summary>
        public string Profile { get; set; }
    }
}