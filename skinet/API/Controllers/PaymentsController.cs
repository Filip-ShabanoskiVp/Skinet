using Api.Entities;
using API.Entities.OrderAggregate;
using API.Errors;
using API.interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace API.Controllers
{

    public class PaymentsController : BaseApiController
    {
        private readonly IPaymentService paymentService;
        private const string WebHookSecret = "whsec_d286b12292a4922c983aacd42a6948112f1ad81171ded13990e20a2de34a0672";
        private readonly ILogger<IPaymentService> logger;

        public PaymentsController(IPaymentService paymentService, ILogger<IPaymentService> logger)
        {
            this.logger = logger;
            this.paymentService = paymentService;
        }

        [Authorize]
        [HttpPost("{basketId}")]
        public async Task<ActionResult<CustomeBasket>> CreateOrUpdatePaymentIntent(string basketId)
        {
            var basket =  await paymentService.CreateOrUpdatePaymentIntent(basketId);

            if(basket == null) return BadRequest(new ApiResponse(400,"Problem with your basket"));

            return basket;
        }

        [HttpPost("webhook")]
        public async Task<ActionResult> StripeWebHook()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();

            var stripeEvent = EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"],
            WebHookSecret);

            PaymentIntent intent;
            Order order;

            switch(stripeEvent.Type){
                case "payment_intent.succeeded":
                    intent = (PaymentIntent) stripeEvent.Data.Object;
                    logger.LogInformation("Payment Succeeded: ",intent);
                    order = await paymentService.UpdateOrderPaymentSucceeded(intent.Id);
                    logger.LogInformation("Order updated to payment reveived: ",order);
                    break;
                case "payment_intent.payment_failed":
                    intent  = (PaymentIntent) stripeEvent.Data.Object;
                    logger.LogInformation("Payment Failed: ",intent.Id);
                    order = await paymentService.UpdateOrderPaymentFailed(intent.Id);
                    logger.LogInformation("Payment Failed: ",order.Id);
                    break;
            }

            return new EmptyResult();
        }
    }
}