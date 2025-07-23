
import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import {  Request, Response} from 'express';
import { PaymentsService } from 'src/payments/services/payments/payments.service';
import { BadRequestException } from '@nestjs/common';

describe('PaymentsController', () => {
  let controller: PaymentsController;
  let paymentService: PaymentsService;


  let requestMock = {
    query: {}
  } as unknown as Request


  const statusResponseMock = {
    send: jest.fn((x) => x),
  }

  const responseMock = {
    status: jest.fn((x) => statusResponseMock),
    send: jest.fn((x) => x),
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [
        {
          provide: 'PAYMENTS_SERVICE',
          useValue: {
            createPayment: jest.fn((x) => x)
          }
        }
      ]
    }).compile();


    controller = module.get<PaymentsController>(PaymentsController);
    paymentService = module.get<PaymentsService>('PAYMENTS_SERVICE')
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('paymentService should be defined', () =>  {
    expect(paymentService).toBeDefined();
  })

  describe('getPayments', () => {
    it('should return a status of 400', async () => {
      await controller.getPayments(requestMock, responseMock);
      expect(responseMock.status).toHaveBeenCalledWith(400);
      expect(statusResponseMock.send).toHaveBeenCalledWith({ msg: 'Count and page query parameters are required.' });
    });

    it('should return a status of 200 if query parameters are provided', async () => {
      requestMock.query = {
        page: "1", count: "1"
      }
      await controller.getPayments(requestMock, responseMock)
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(statusResponseMock.send).toHaveBeenCalledWith({msg: `Payments retrieved successfully` })
    })
  });

  // Error Case
  describe('createPayment' , () => {
    it('should throw an error', async () => {
      jest.spyOn(paymentService, 'createPayment' ).mockImplementationOnce(() => {
        throw new BadRequestException();
      })
      try {
          await controller.createPayment({email: 'maxmerock@gmail.com', price: 100})

      } catch (err) {
        return err
      }
    })
    it('should return a success', async () => {
      
    })
  })
});

