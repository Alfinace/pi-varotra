import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Order } from "src/order/entities/order.entity";

@Table({ tableName: "payement_a2u" })
export class PayementA2U extends Model {

	@Column({ field: "uid" })
	uid: string;

	@Column({ field: "amount" })
	amount: number;

	@ForeignKey(() => Order)
	@Column({ field: "order_id" })
	orderId: number;

	@Column({ field: "memo" })
	memo: string;

	@Column({ field: 'metadata' })
	metadata: string;

	@Column({ field: "pi_payment_id" })
	piPaymentId: string;

	@Column({ field: "txid" })
	txid: string;

	@Column({ field: "created_at" })
	createdAt: Date;

	@Column({ field: "updated_at" })
	updatedAt: Date;
}
