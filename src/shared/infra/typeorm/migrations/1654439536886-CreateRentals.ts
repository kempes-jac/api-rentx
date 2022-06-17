import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateRentals1654439536886 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "rentals",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "car_id",
                        type: "uuid",
                        isNullable: false
                    },
                    {
                        name: "user_id",
                        type: "uuid",
                        isNullable: false
                    },
                    {
                        name: "start_date",
                        type: "timestamp",
                        default: "date_trunc('day', now())"
                    },
                    {
                        name: "end_date",
                        type: "timestamp",
                        isNullable: true
                    },
                    {
                        name: "expected_return_date",
                        type: "timestamp",
                        isNullable: true
                    },
                    {
                        name: "total",
                        type: "numeric(10,2)",
                        isNullable: true
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys:[
                    {
                        name: "FK_Cars_Rentals",
                        referencedTableName: "cars",
                        referencedColumnNames: [ "id" ],
                        columnNames: [ 'car_id' ],
                        onDelete: 'RESTRICT',
                        onUpdate: 'CASCADE'

                    },
                    {
                        name: "FK_Users_Rentals",
                        referencedTableName: "users",
                        referencedColumnNames: [ 'id' ],
                        columnNames: [ 'user_id' ],
                        onDelete: 'RESTRICT',
                        onUpdate: 'CASCADE'
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("rentals")
    }

}
