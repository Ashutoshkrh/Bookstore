//starter file
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DoggService } from './dogg.service';
import { CreateDoggDTO, SolveDoggDTO, DoggresponseDTO } from './dto/createdogg.dto';
@Controller('dogg')
export class DoggController {
  constructor(private readonly doggService: DoggService) {}
    @Get("listall")
    getAllDoggs() {
        return this.doggService.getDoggList();
    }
    @Post("create")
    createDogg(@Body() dog: CreateDoggDTO) {
        this.doggService.createDogg(dog.name);
        return { message: "Dogg created successfully" };
    }
    @Post("solve")
    solveDogg(@Body() dog: SolveDoggDTO): DoggresponseDTO {
        const result: string = this.doggService.solve(dog.dognum, dog.doggnaam);
        return { doggnaam: result };
    }
}