import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateSpecificationsCars1654382734137 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'specifications_cars',
                columns: [
                    {
                        name: "car_id",
                        type: "uuid"
                    },
                    {
                        name: "specification_id",
                        type: "uuid"
                    },
                    {
                        name: "create_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
            })
        );
        await queryRunner.createForeignKey(
            "specifications_cars",
            new TableForeignKey({
                name: 'FK_Specifications_Specifications_Cars',
                referencedTableName: "specifications",
                referencedColumnNames: ['id'],
                columnNames: ["specification_id"],
                onDelete: 'RESTRICT',
                onUpdate: 'CASCADE'
            })
        );
        await queryRunner.createForeignKey(
            "specifications_cars",
            new TableForeignKey({
                name: 'FK_Cars_Specifications_Cars',
                referencedTableName: "cars",
                referencedColumnNames: ['id'],
                columnNames: ["car_id"],
                onDelete: 'RESTRICT',
                onUpdate: 'CASCADE'
            })
        );
        await queryRunner.createPrimaryKey(
            "specifications_cars",
            [
                "car_id",
                "specification_id"
            ]
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropPrimaryKey('specifications_cars');
        await queryRunner.dropForeignKey(
            "specifications_cars",
            'FK_Specifications_Specifications_Cars'
        );
        await queryRunner.dropForeignKey(
            "specifications_cars",
            'FK_Cars_Specifications_Cars'
        );
        await queryRunner.dropTable('specifications_cars')
    }

}
