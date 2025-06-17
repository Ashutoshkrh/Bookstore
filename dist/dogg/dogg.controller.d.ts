import { DoggService } from './dogg.service';
import { CreateDoggDTO, SolveDoggDTO, DoggresponseDTO } from './dto/createdogg.dto';
export declare class DoggController {
    private readonly doggService;
    constructor(doggService: DoggService);
    getAllDoggs(): string[];
    createDogg(dog: CreateDoggDTO): {
        message: string;
    };
    solveDogg(dog: SolveDoggDTO): DoggresponseDTO;
}
