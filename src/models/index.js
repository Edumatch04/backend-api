import "./validadorGlobal.js";
import escolas from "./escolaModel.js";
import alunos from "./alunoModel.js";
import funcionario from "./funcionarioModel.js";
import Professor from './professorModel.js';
import Materia from './materiaModel.js';
import ProfessorMateria from './professorMateriaModel.js'; 
import User from './userModel.js'; 

// Estabelecendo as associações após carregar todos os modelos
Professor.belongsToMany(Materia, { through: ProfessorMateria, foreignKey: "professor_id" });
Materia.belongsToMany(Professor, { through: ProfessorMateria, foreignKey: "materia_id" });

export { escolas, alunos, funcionario, User };