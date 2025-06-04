import { DataTypes } from "sequelize";
import { sequelizeAdventistaTucuruvi } from "../config/dbConnect.js";

const ReforcoTeste = sequelizeAdventistaTucuruvi.define("ReforcoTeste", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    material_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: "reforcos_materiais", key: "id" } 
    },
    pergunta: { 
        type: DataTypes.TEXT, 
        allowNull: false 
    },
    multipla_escolha: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: false 
    },
    tempo_segundos: { 
        type: DataTypes.INTEGER, 
        allowNull: true 
    },
    valor: { 
        type: DataTypes.DECIMAL(5,2), 
        allowNull: true 
    }
}, { 
    tableName: "reforcos_testes", 
    timestamps: false 
});

export default ReforcoTeste;