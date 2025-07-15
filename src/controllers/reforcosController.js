import Reforco from "../../../models/reforcoModel.js";
import ReforcoConteudo from "../../../models/reforcoConteudoModel.js";
import ReforcoMaterial from "../../../models/reforcoMaterialModel.js";
import ReforcoTeste from "../../../models/reforcoTesteModel.js";
import ReforcoAluno from "../../../models/reforcoAlunoModel.js";
import NaoEncontrado from "../../../erros/NaoEncontrado.js";

class ReforcosController {
    // Criar um novo reforço
    static criarReforco = async (req, res, next) => {
        try {
            const { materia_id, professor_id, turma_id, titulo, descricao } = req.body;

            if (!materia_id || !professor_id || !turma_id || !titulo) {
                return res.status(400).json({ message: "Campos obrigatórios faltando." });
            }

            const reforco = await Reforco.create({
                materia_id,
                professor_id,
                turma_id,
                titulo,
                descricao
            });

            res.status(201).json({ message: "Reforço criado com sucesso!", reforco_id: reforco.id });
        } catch (erro) {
            next(erro);
        }
    };

    // Adicionar conteúdo ao reforço
    static adicionarConteudo = async (req, res, next) => {
        try {
            const { reforco_id } = req.params;
            const { conteudo, arquivo } = req.body;

            if (!conteudo && !arquivo) {
                return res.status(400).json({ message: "Pelo menos um dos campos 'conteudo' ou 'arquivo' é obrigatório." });
            }

            const novoConteudo = await ReforcoConteudo.create({
                reforco_id,
                conteudo,
                arquivo
            });

            res.status(201).json({ message: "Conteúdo adicionado com sucesso!", conteudo: novoConteudo });
        } catch (erro) {
            next(erro);
        }
    };

    // Adicionar material (resumo ou teste)
    static adicionarMaterial = async (req, res, next) => {
        try {
            const { reforco_id } = req.params;
            const { tipo, titulo, descricao } = req.body;

            if (!tipo || (tipo !== 'resumo' && tipo !== 'teste')) {
                return res.status(400).json({ message: "O campo 'tipo' é obrigatório e deve ser 'resumo' ou 'teste'." });
            }

            const material = await ReforcoMaterial.create({
                reforco_id,
                tipo,
                titulo,
                descricao
            });

            res.status(201).json({ message: "Material adicionado com sucesso!", material_id: material.id });
        } catch (erro) {
            next(erro);
        }
    };

    // Adicionar teste a um material
    static adicionarTeste = async (req, res, next) => {
        try {
            const { material_id } = req.params;
            const { pergunta, multipla_escolha, tempo_segundos, valor } = req.body;

            if (!pergunta || typeof multipla_escolha !== "boolean") {
                return res.status(400).json({ message: "Os campos 'pergunta' e 'multipla_escolha' são obrigatórios." });
            }

            const teste = await ReforcoTeste.create({
                material_id,
                pergunta,
                multipla_escolha,
                tempo_segundos,
                valor
            });

            res.status(201).json({ message: "Teste adicionado com sucesso!", teste_id: teste.id });
        } catch (erro) {
            next(erro);
        }
    };

    // Adicionar alunos ao reforço
    static adicionarAlunos = async (req, res, next) => {
        try {
            const { reforco_id } = req.params;
            const { alunos } = req.body; // Array de IDs de alunos

            if (!alunos || !Array.isArray(alunos)) {
                return res.status(400).json({ message: "O campo 'alunos' é obrigatório e deve ser um array." });
            }

            // Primeiro remove quaisquer alunos existentes para este reforço
            await ReforcoAluno.destroy({ where: { reforco_id } });

            // Adiciona os novos alunos
            const alunosParaAdicionar = alunos.map(aluno_id => ({ reforco_id, aluno_id }));
            await ReforcoAluno.bulkCreate(alunosParaAdicionar);

            res.status(201).json({ message: "Alunos adicionados ao reforço com sucesso!", total: alunos.length });
        } catch (erro) {
            next(erro);
        }
    };

    // Listar reforços
    static listarReforcos = async (req, res, next) => {
        try {
            const reforcos = await Reforco.findAll();

            if (reforcos.length > 0) {
                res.status(200).json(reforcos);
            } else {
                next(new NaoEncontrado("Nenhum reforço encontrado."));
            }
        } catch (erro) {
            next(erro);
        }
    };

    // Obter detalhes de um reforço
    static obterReforco = async (req, res, next) => {
        try {
            const { id } = req.params;
            console.log(`Buscando reforço com ID: ${id}`); // Log para debug

            const reforco = await Reforco.findByPk(id, {
                include: [
                    {
                        model: ReforcoConteudo,
                        as: 'conteudos',
                        required: false // Não obriga a existir conteúdos
                    },
                    {
                        model: ReforcoMaterial,
                        as: 'materiais',
                        required: false, // Não obriga a existir materiais
                        include: [{
                            model: ReforcoTeste,
                            as: 'testes',
                            required: false // Não obriga a existir testes
                        }]
                    },
                    {
                        model: ReforcoAluno,
                        as: 'alunos',
                        required: false // Não obriga a existir alunos
                    }
                ]
            });

            console.log('Resultado da busca:', reforco); // Log para debug

            if (!reforco) {
                console.log('Reforço não encontrado');
                return next(new NaoEncontrado("Reforço não encontrado."));
            }

            res.status(200).json(reforco);
        } catch (erro) {
            console.error('Erro ao buscar reforço:', erro); // Log detalhado do erro
            next(erro);
        }
    };

    // Atualizar reforço
    static atualizarReforco = async (req, res, next) => {
        try {
            const { id } = req.params;
            const [updated] = await Reforco.update(req.body, { where: { id } });

            if (updated) {
                res.status(200).json({ message: "Reforço atualizado com sucesso!" });
            } else {
                next(new NaoEncontrado("Reforço não encontrado."));
            }
        } catch (erro) {
            next(erro);
        }
    };

    // Excluir reforço
    static excluirReforco = async (req, res, next) => {
        try {
            const { id } = req.params;

            // Primeiro exclui os conteúdos, materiais, testes e alunos associados
            await ReforcoConteudo.destroy({ where: { reforco_id: id } });
            await ReforcoTeste.destroy({ where: { material_id: id } });
            await ReforcoMaterial.destroy({ where: { reforco_id: id } });
            await ReforcoAluno.destroy({ where: { reforco_id: id } });

            // Depois exclui o reforço
            const deleted = await Reforco.destroy({ where: { id } });

            if (deleted) {
                res.status(200).json({ message: "Reforço removido com sucesso!" });
            } else {
                next(new NaoEncontrado("Reforço não encontrado."));
            }
        } catch (erro) {
            next(erro);
        }
    };
}

export default ReforcosController;