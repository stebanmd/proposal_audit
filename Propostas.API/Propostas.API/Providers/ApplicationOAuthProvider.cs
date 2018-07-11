using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using Propostas.Lib.Models;
using Propostas.Lib.Service;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Propostas.API.Providers
{
    public class ApplicationOAuthProvider : OAuthAuthorizationServerProvider
    {
        private readonly string _publicClientId;
        private readonly UsuarioService service;

        public ApplicationOAuthProvider(string publicClientId)
        {
            _publicClientId = publicClientId ?? throw new ArgumentNullException("publicClientId");
            service = new UsuarioService();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            var loginResult = service.Login(context.UserName, context.Password);
            if (!loginResult.Sucesso)
            {
                context.SetError("invalid_grant", loginResult.Mensagem);
                return;
            }
            var user = loginResult.Retorno;

            context.Options.AccessTokenExpireTimeSpan = TimeSpan.FromDays(15);

            var identity = new ClaimsIdentity(context.Options.AuthenticationType, context.UserName, user.Perfil.Description());
            identity.AddClaim(new Claim("IdUsuario", user.ID.ToString()));

            context.Validated(identity);

            AuthenticationProperties properties = CreateProperties(user);
            AuthenticationTicket ticket = new AuthenticationTicket(identity, properties);
            context.Validated(ticket);
            context.Request.Context.Authentication.SignIn(identity);
        }

        private AuthenticationProperties CreateProperties(UsuarioModel user)
        {
            IDictionary<string, string> data = new Dictionary<string, string>
            {
                { "userName", user.Nome },
                { "userId", user.ID.ToString() },
                { "userProfile", user.Perfil.ToString() }
            };
            return new AuthenticationProperties(data);
        }

        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }

            return Task.FromResult<object>(null);
        }

        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            if (context.ClientId == null)
            {
                context.Validated();
            }

            return Task.FromResult<object>(null);
        }

        public override Task ValidateClientRedirectUri(OAuthValidateClientRedirectUriContext context)
        {
            if (context.ClientId == _publicClientId)
            {
                Uri expectedRootUri = new Uri(context.Request.Uri, "/");

                if (expectedRootUri.AbsoluteUri == context.RedirectUri)
                {
                    context.Validated();
                }
            }

            return Task.FromResult<object>(null);
        }
    }
}