import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthAccount } from './account.entity';

@Injectable()
export class AccountService {

  constructor(
    @InjectRepository(AuthAccount)
    private readonly authAccountRepository: Repository<AuthAccount>,
  ) { }

  async findAll(): Promise<AuthAccount[] | undefined> {
    return this.authAccountRepository.find();
  }

  async findOne(username: string): Promise<AuthAccount | undefined> {
    return this.authAccountRepository.findOne({
      where: {
        username,
      },
    });
  }

  async create(account: AuthAccount): Promise<AuthAccount | undefined> {
    const authAccount = this.authAccountRepository.create(account);
    return await this.authAccountRepository.save(authAccount);
  }
}
