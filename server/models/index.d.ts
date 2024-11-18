import { Model, Sequelize, DataTypes, ModelCtor, LivroInstance } from 'sequelize';

// Definição das interfaces para os atributos de cada modelo
interface UserAttributes {
  idUser?: number;
  name: string;
  email: string;
  telefone: string;
  password: string;
}

interface AlunoAttributes {
  idAluno?: number;
  idUser: number;
  matricula: string;
}

interface ProfessorAttributes {
  idProfessor?: number;
  idUser: number;
  disciplina: string;
}

interface LivroAttributes {
  idLivro?: number;
  titulo: string;
  autor: string;
  capa: string;
  editora: string;
  ano_publicacao: number;
  genero: string;
  idProfessor: number;
}

// Extensão do módulo sequelize para incluir suas interfaces personalizadas
declare module 'sequelize' {
  interface UserInstance extends Model<UserAttributes>, UserAttributes {}
  interface AlunoInstance extends Model<AlunoAttributes>, AlunoAttributes {}
  interface ProfessorInstance extends Model<ProfessorAttributes>, ProfessorAttributes {}
  interface LivroInstance extends Model<LivroAttributes>, LivroAttributes {}
}

// Exportação das entidades
export const User: ModelCtor<UserInstance>;
export const Aluno: ModelCtor<AlunoInstance>;
export const Professor: ModelCtor<ProfessorInstance>;
export const Livro: ModelCtor<LivroInstance>;
