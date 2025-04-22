import "./validadorGlobal.js";
import escolas from "./escolaModel.js";
import alunos from "./alunoModel.js";
import turmas from "./turmaModel.js";
import funcionario from "./funcionarioModel.js";
import Professor from './professorModel.js';
import Materia from './materiaModel.js';
import ProfessorMateria from './professorMateriaModel.js'; 
import User from './userModel.js'; 
import Acesso from './tempoModel.js';
import Publicacao from "./publicacaoModel.js";

Professor.belongsToMany(Materia, { through: ProfessorMateria, foreignKey: "professor_id" });
Materia.belongsToMany(Professor, { through: ProfessorMateria, foreignKey: "materia_id" });
alunos.belongsTo(turmas, {foreignKey: "turma_id", as: "turma"});
turmas.hasMany(alunos, {foreihnKey: "turma_id", as: "alunos"});
alunos.hasMany(Acesso, { foreignKey: 'aluno_id', as: 'acessos' });
Acesso.belongsTo(alunos, { foreignKey: 'aluno_id', as: 'aluno' });

export { escolas, alunos, turmas, funcionario, User, Acesso, Publicacao };