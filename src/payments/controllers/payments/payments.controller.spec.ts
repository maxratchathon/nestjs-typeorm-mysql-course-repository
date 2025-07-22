import { send } from 'process';
import { Req } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import { query, Request, Response} from 'express';
import { json } from 'stream/consumers';

describe('PaymentsController', () => {
  let controller: PaymentsController;

  const requestMock = {
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
    }).compile();


    controller = module.get<PaymentsController>(PaymentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getPayments', () => {
    it('should return a status of 400', () => {
      controller.getPayments(requestMock, responseMock);
      expect(responseMock.status).toHaveBeenCalledWith(400);
      expect(statusResponseMock.send).toHaveBeenCalledWith({ msg: 'Count and page query parameters are required.' });
    });
  });
});
