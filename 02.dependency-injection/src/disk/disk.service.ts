import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';

@Injectable()
export class DiskService {
  constructor(private powerService: PowerService) {}

  getData() {
    console.log('drawing 20 wats of powwer from PowerService');
    this.powerService.supplyPower(20);
    return 'data';
  }
}
