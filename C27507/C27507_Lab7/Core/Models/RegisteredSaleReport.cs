using System.Collections.Generic;
//namespace Core;
namespace MyStoreAPI.Models{

    public class RegisteredSaleReport {
        public List<RegisteredSale> salesByDay { get; set; }
        public List<RegisteredSaleWeek> salesByWeek { get; set; }
    }
}