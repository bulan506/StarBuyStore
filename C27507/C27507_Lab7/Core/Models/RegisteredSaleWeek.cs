using System.Collections.Generic;
//namespace Core;
namespace MyStoreAPI.Models{

    public sealed class RegisteredSaleWeek{

        public string dayOfWeek  {get;set;}
        public decimal total {get;set;}

        public RegisteredSaleWeek(){}
    }
}
