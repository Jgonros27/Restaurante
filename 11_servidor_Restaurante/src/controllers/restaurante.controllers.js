import conexion from "../mysql_conector.js"



export const getRestaurantes= async (req,res)=>{
   try {
      //throw new Error();
      const [result] = await conexion.query("SELECT * FROM restaurantes");
   console.log(result);
   res.status(200).json(result);
   } catch (error) {
      res.status(500).json({
         message:"Error en el servidor"
      });
   }
   
}

export const getEmpleados= async (req,res)=>{
   try {
      console.log(req.params);
      const {idrest}=req.params;
      const [result] = await conexion.query("SELECT * FROM empleados where idrest=?",[idrest]);
   console.log(result);
   res.status(200).json(result);
   } catch (error) {
      res.status(500).json({
         message:"Error en el servidor"
      });
   }
   
}

export const getReservas= async (req,res)=>{
   try {
      console.log(req.params);
      const {idrest,fecha}=req.params;
      const [result] = await conexion.query("SELECT idreservas, mesa, nomapecli FROM `reservas` WHERE idrest=? AND fecha=?",[idrest,fecha]);
   console.log(result);
   res.status(200).json(result);
   } catch (error) {
      res.status(500).json({
         message:"Error en el servidor"
      });
   }
   
}


export const deleteReservas= async (req,res)=>{
   try {
      console.log(req.params);
   const {idreserva}=req.params;
   const [result] = await conexion.query("DELETE FROM reservas WHERE idreservas=?",[idreserva]);
   console.log(result);
   if (result.affectedRows==0) {
      return res.status(400).json({
         message:'El cliente no existe'
      })
    }else{
      return res.status(200).json({
         message:'El cliente ha sido eliminado'
      
    })
   }
   } catch (error) {
      res.status(500).json({
         message:"Error en el servidor"
      });
   }
   
}

export const addReserva= async (req,res)=>{
   try {
      
    const {mesa, rest, emp,fecha,cli,comen}=req.body;
    const [result] = await conexion.query("INSERT INTO reservas VALUES (NULL,?,?,?,?,?,?)",[ rest, emp,fecha,mesa,cli,comen]);
    console.log(result);
   res.status(201).json(result); //La respuesta que devuelve el servidor
   } catch (error) {
      res.status(500).json({
         message:"Error en el servidor"
      });
   }
   
}

