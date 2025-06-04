import { DataTypes } from "sequelize";
import { sequelizeAdventistaTucuruvi } from "../config/dbConnect.js";

const ReforcoMaterial = sequelizeAdventistaTucuruvi.define("ReforcoMaterial", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    reforco_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: "reforcos", key: "id" } 
    },
    tipo: { 
        type: DataTypes.STRING(50),
        allowNull: false
    },
    titulo: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, { 
    tableName: "reforcos_materiais", 
    timestamps: false 
});

export default ReforcoMaterial;