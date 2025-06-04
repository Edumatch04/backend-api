import { DataTypes } from "sequelize";
import { sequelizeAdventistaTucuruvi } from "../config/dbConnect.js";

const ReforcoConteudo = sequelizeAdventistaTucuruvi.define("ReforcoConteudo", {
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
    conteudo: { 
        type: DataTypes.TEXT, 
        allowNull: true 
    },
    arquivo: { 
        type: DataTypes.STRING(255), 
        allowNull: true 
    },
    data_adicao: { 
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW 
    }
}, { 
    tableName: "reforcos_conteudos", 
    timestamps: false 
});

export default ReforcoConteudo;