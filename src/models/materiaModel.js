import { DataTypes } from "sequelize";
import { sequelizeAdventistaTucuruvi } from "../config/dbConnect.js";

const Materia = sequelizeAdventistaTucuruvi.define("Materia", {
    id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    tableName: "materias", 
    timestamps: false,    
});

export default Materia;
