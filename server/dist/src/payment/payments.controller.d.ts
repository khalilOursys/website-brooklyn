import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    create(createPaymentDto: CreatePaymentDto): Promise<{
        id: string;
        createdAt: Date;
        status: string;
        orderId: string;
        amount: number;
        method: string;
        paymentId: string | null;
    }>;
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        status: string;
        orderId: string;
        amount: number;
        method: string;
        paymentId: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        status: string;
        orderId: string;
        amount: number;
        method: string;
        paymentId: string | null;
    }>;
    update(id: string, updatePaymentDto: UpdatePaymentDto): Promise<{
        id: string;
        createdAt: Date;
        status: string;
        orderId: string;
        amount: number;
        method: string;
        paymentId: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        status: string;
        orderId: string;
        amount: number;
        method: string;
        paymentId: string | null;
    }>;
}
