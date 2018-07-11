using System;
using System.ComponentModel.DataAnnotations;

namespace Propostas.Lib.Attributes
{
    public class ChecaDataAntigaAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            DateTime dt = (DateTime)value;

            if (dt < DateTime.Today.AddYears(-100))
            {
                return new ValidationResult(ErrorMessage ?? "Data informada é muito antiga");
            }

            return ValidationResult.Success;
        }
    }

    public class ChecaDataMaiorQueAtualAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            DateTime dt = (DateTime)value;

            if (dt > DateTime.Today)
            {
                return new ValidationResult(ErrorMessage ?? "Data informada é superior à atual");
            }

            return ValidationResult.Success;
        }
    }
}