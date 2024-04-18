using Microsoft.AspNetCore.Mvc;
using ShopApi.Models;
using System;
using System.Collections.Generic;

namespace ShopApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        [HttpGet]
        public Store GetStore()
        {
            return Store.Instance ;
        }
    }

}