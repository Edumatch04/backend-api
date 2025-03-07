import { DataTypes } from "sequelize";
import { sequelizeAdventistaTucuruvi } from "../config/dbConnect.js";

const Professor = sequelizeAdventistaTucuruvi.define("Professor", {
    id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    funcionario_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: {
            model: 'funcionarios', 
            key: 'id'
        }
    },
}, {
    tableName: "professores", 
    timestamps: false,
});

export default Professor;
