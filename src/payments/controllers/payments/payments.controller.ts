import { Body, Controller, Get, Inject, Post, Req, Res } from '@nestjs/common';
import { Request, response, Response } from 'express';
import { CreatePaymentDto } from '../../dto/CreatePayment.dto';
import { PaymentsService } from '../../services/payments/payments.service';

@Controller('payments')
export class PaymentsController {

    constructor(
        @Inject('PAYMENTS_SERVICE') 
        private readonly paymentsService: PaymentsService,
    ) {}

    @Get()
    getPayments(@Req() request: Request, @Res() response: Response) {
    const {count, page} = request.query;
    if (!count || !page) {
        return response.status(400).send({ msg: 'Count and page query parameters are required.' });
    } else {
        return response.status(200).send({
            msg: `Payments retrieved successfully`,
        });
    }
}

 @Post('create')
 async createPayment(@Body()
createPaymentDto: CreatePaymentDto) {

       const response =  await this.paymentsService.createPayment(createPaymentDto)
        return response
   
    
 }
}
