import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, RepositoryNotFoundError, JoinColumn} from 'typeorm';
import Jogador from '../models/Jogador';

@Entity('tb_compra')
class Compra {
    @PrimaryGeneratedColumn()//geracao automatica de chave primaria
    id: number;

    @Column('date', {default: () => 'CURRENT_TIMESTAMP'})
    data: Date;

    @Column({type: "decimal", nullable: true, precision: 2 })
    total: number;

    @ManyToOne(type => Jogador)
    @JoinColumn({name: "jogador_nickname", referencedColumnName: "nickname"})
    jogador: Jogador; 
   
}
export default Compra;