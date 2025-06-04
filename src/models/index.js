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
import Trabalho from "./trabalhoModel.js";
import Questao from "./questaoTrabalhoModel.js";
import Alternativa from "./alternativaQuestaoModel.js";
import Reforco from "./reforcoModel.js";
import ReforcoConteudo from "./reforcoConteudoModel.js";
import ReforcoAluno from "./reforcoAlunoModel.js";
import ReforcoMaterial from "./reforcoMaterialModel.js";
import ReforcoTeste from "./reforcoTesteModel.js";

Professor.belongsToMany(Materia, { through: ProfessorMateria, foreignKey: "professor_id" });
Materia.belongsToMany(Professor, { through: ProfessorMateria, foreignKey: "materia_id" });
alunos.belongsTo(turmas, {foreignKey: "turma_id", as: "turma"});
turmas.hasMany(alunos, {foreihnKey: "turma_id", as: "alunos"});
alunos.hasMany(Acesso, { foreignKey: 'aluno_id', as: 'acessos' });
Acesso.belongsTo(alunos, { foreignKey: 'aluno_id', as: 'aluno' });
Trabalho.hasMany(Questao, { foreignKey: "trabalho_id" });
Questao.belongsTo(Trabalho, { foreignKey: "trabalho_id" });
Questao.hasMany(Alternativa, { foreignKey: "questao_id" });
Alternativa.belongsTo(Questao, { foreignKey: "questao_id" });
Reforco.hasMany(ReforcoConteudo, { foreignKey: 'reforco_id', as: 'conteudos' });
ReforcoConteudo.belongsTo(Reforco, { foreignKey: 'reforco_id' });

Reforco.hasMany(ReforcoMaterial, { foreignKey: 'reforco_id', as: 'materiais' });
ReforcoMaterial.belongsTo(Reforco, { foreignKey: 'reforco_id' });

ReforcoMaterial.hasMany(ReforcoTeste, { foreignKey: 'material_id', as: 'testes' });
ReforcoTeste.belongsTo(ReforcoMaterial, { foreignKey: 'material_id' });

Reforco.hasMany(ReforcoAluno, { foreignKey: 'reforco_id', as: 'alunos' });
ReforcoAluno.belongsTo(Reforco, { foreignKey: 'reforco_id' });

export { escolas, alunos, turmas, funcionario, User, Acesso, Publicacao, Trabalho, Questao, Reforco, ReforcoAluno, ReforcoConteudo, ReforcoMaterial, ReforcoTeste };