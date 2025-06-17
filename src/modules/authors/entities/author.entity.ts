import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'author' })
export class Author {
  @PrimaryGeneratedColumn('uuid')
  author_id: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'datetime',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_date: Date;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  created_from: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  created_by: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  created_name: string;

  @Column({
    type: 'datetime',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  modified_date: Date;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  modified_from: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  modified_by: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  modified_name: string;
}
