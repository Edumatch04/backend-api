import { DataTypes } from "sequelize";
import { sequelizeAdventistaTucuruvi } from "../config/dbConnect.js";
import Professor from "./professorModel.js";
import Materia from "./materiaModel.js";

const ProfessorMateria = sequelizeAdventistaTucuruvi.define("ProfessorMateria", {
    id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    professor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: Professor, key: "id" },
    },
    materia_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: Materia, key: "id" },
    },
}, {
    tableName: "professores_materias", 
    timestamps: false,    
});

Professor.belongsToMany(Materia, { through: ProfessorMateria, foreignKey: "professor_id" });
Materia.belongsToMany(Professor, { through: ProfessorMateria, foreignKey: "materia_id" });

export default ProfessorMateria;
