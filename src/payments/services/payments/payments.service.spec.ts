import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsService } from './payments.service';
import { NotFoundException } from '@nestjs/common';

describe('PaymentsService', () => {
  let service: PaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentsService],
    }).compile();

    service = module.get<PaymentsService>(PaymentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return success if email exist', () => {
    const dto = {email: 'maxmerock@gmail.com', price: 100}
    const result = service.createPayment(dto)
    expect(result).toEqual({status: 'success'})
  })

  it('should throw error if email didnt exist in user', () => {
    const dto = {email: 'maxmelove@gmail.com', price: 100} 
    expect(() => service.createPayment(dto)).toThrow(NotFoundException)
  }
  )
});
