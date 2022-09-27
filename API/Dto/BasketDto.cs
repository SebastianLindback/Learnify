using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dto
{
    public class BasketDto
    {
        public string ClientId { get; set; }
        public List<BasketItemDto> Items { get; set; }

        public string PaymentIntentId { get; set; }

        public string ClientSecret { get; set; }
    }
}