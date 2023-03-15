import CardForm from "../components/CardForm";
import TextField from "@mui/material/TextField";
import { useForm, Controller } from "react-hook-form";
import {  styled } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass,faPlus,faTrash,faCheck} from '@fortawesome/free-solid-svg-icons'
import LoadingButton from '@mui/lab/LoadingButton';
import { getProductById,saveVenta } from "../models/modelo";
import { useState,useCallback } from "react";
import Swal from 'sweetalert2'
import { DataGrid,  GridActionsCellItem, GridRowModes,  } from '@mui/x-data-grid';
import { CustomFooter } from "../components/CustomFooter";
import NavBar from "../components/NavBar";

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: 'black',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgb(2, 185, 155)',
        borderWidth: 2,
      },
      '&:hover fieldset': {
        //borderColor: 'yellow',
        borderColor: 'rgb(2, 185, 155)',
        boxShadow:'0 0 0 0.2rem rgba(4, 206, 172, 0.25)',
      },
      /*'&.Mui-focused fieldset': {
        borderColor: 'rgb(2, 185, 155)',
        boxShadow:'0 0 0 0.2rem rgba(4, 206, 172, 0.25)'
      },*/
    },
});

  
const Venta = () => {
    const [rows, setRows] =useState([]);
    const columns = [
        { field: 'id', headerName: 'Id', maxWidth:60,headerAlign: 'center',align:'center'},
        { field: 'descripcion',  headerName: 'Descripción', flex:1,headerAlign: 'center',align:'center' },
        { field: 'cantidad',  headerName: 'Cantidad', flex:1, type: 'number',headerAlign: 'center', editable: true,
        
        },
        { field: 'precio',  headerName: 'Precio', flex: 1, type: 'number',headerAlign: 'center' },
        {   
            maxWidth:60,description:'Editar',field: 'actions',type: 'actions',
            align:'right',
            getActions: (params) => [
              
                <GridActionsCellItem
                    icon={<FontAwesomeIcon icon={faTrash}  />}
                    label="Quitar"
                    onClick={deleteProduct(params)}
                />,
                
            ],
        },
    ];
    const {register,handleSubmit,formState: { errors },watch,reset, control,setFocus} = useForm();
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)
    const [products, setProducts] = useState({data:[]})
    const [rowCount, setRowCount] = useState(0)
    const [total, setTotal] = useState(0)
    
    
    const deleteProduct = ({id,row}) => () => {
        setTotal(total-(row.precio*row.cantidad))
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    }
  
    const confirmSale=async () => { 
        var userId=Number(window.localStorage.getItem("userId"))
        const data={'products':{},'user_id':userId};
       
        if (rows.length>0) {
            setSaving(true)
            console.log(rows)
            data.total=total;
            rows.map((el)=>{
               data.products[`${el.id}`]={"producto_cantidad":el.cantidad};
            })
            console.log(data)
            try {
                const resp=await saveVenta(data);
                console.log(resp.status)
                setSaving(false);
                if (resp.status==201) {
                    Swal.fire({
                        position: 'top',
                        icon: 'success',
                        title:'Venta añadida',
                        showConfirmButton: true,
                        allowOutsideClick:false,
                    });
                    setRows([])
                    setTotal(0)

                }
            } catch (error) {
                setSaving(false);
                if (error.response.status==422) {
                    Swal.fire({
                        position: 'top',
                        icon: 'warning',
                        title:    error.response.data.msg,
                        showConfirmButton: true,
                        allowOutsideClick:false,
                    });
                }else{
                    Swal.fire({
                        position: 'top',
                        icon: 'warning',
                        title:error.message,
                        showConfirmButton: true,
                        allowOutsideClick:false,
                    });
                }
              
                
                
            }

        }
    }
   
    const onSubmit = async (data) =>{
        var exists=false;
        setLoading(true)
        console.log(data)
       /* var roots = rows.map(function(val,i) {
            return {
                ...val,
                cantidad: val.cantidad+1
            };
        });*/
        const newRows=rows.map((val,i)=>{
            console.log(val.id)
            
            if (data.codigo==val.id) {
                exists=true
                setTotal(total+(val.precio*val.cantidad))
                return {
                    ...val,
                    cantidad: Number(val.cantidad)+Number(data.cantidad)
                };
            }else{

                return val
            }
            
        }) 
    
       
        if (!exists) {
            const resp= await getProductById(data.codigo)
            setLoading(false)
            console.log(resp)
            if (resp.status==200) {
                if (resp.data.stock<=0) {
                    Swal.fire({
                    position: 'bottom-end',
                    icon: 'warning',
                    title:'Producto agotado',
                    showConfirmButton: false,
                    toast:true,
                    timer: 2000,
                    target:document.getElementById('ex')
                    });
                    
                }else{
                    resp.data.cantidad=data.cantidad;
                    setProducts(prevState => ({ ...prevState, data: [...prevState.data, resp.data]}));
                    setRowCount(rowCount+1)
                    setRows((prevRows) => [...prevRows,resp.data]);
                
                    setTotal(total+(resp.data.precio*data.cantidad))
                }
                
                
              
                
               
              
            }else if (resp.status==204) {
                Swal.fire({
                    position: 'top',
                    icon: 'warning',
                    title:'No existe el producto',
                    showConfirmButton: false,
                    toast:true,
                    timer: 2000,
                });
            }
            
        }else{
            setRows(newRows)
            setLoading(false)
        }
       
        reset()
        //setFocus("name")
        setTimeout(() => {
                setFocus('codigo');
        }, 1);

    
    }
    
    const pages=['Ventas','Products']
    return (
        <>  
            <NavBar pages={pages}/>
            <div className="container mt-4" id="ex">
                <CardForm title="Venta" colSize="8">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row justify-content-center">
                            <div className="col-lg-7 mb-3">
                                <Controller
                                    defaultValue=""
                                    name={"codigo"}
                                    control={control}
                                    rules={{
                                        required: "Inresa el código",
                                        min:{value:1,message:"Valor invalido"},
                                        maxLength:{value:7,message:'Solo se permiten máximo 7 números'}
                                    }}
                                    render={({ field: { onChange, value,ref },fieldState }) => (
                                    <CssTextField onChange={onChange} value={value} label={"Código Producto"} type="number"
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        sx={{width:'100%'}}
                                        inputRef={ref}
                                        InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                            {<FontAwesomeIcon icon={faMagnifyingGlass}  />}
                                            </InputAdornment>
                                        ),
                                        inputMode: 'numeric', pattern: '[0-9]*',
                                        inputProps:{min:1}
                                        }}
                                    />
                                    )}
                                />
                            </div>
                            <div className="col">
                                <Controller
                                    defaultValue={1}
                                    name={"cantidad"}
                                    control={control}
                                    rules={{
                                        //valueAsNumber: true,
                                        validate: {
                                            positive: v => parseInt(v) >0 || 'should be greater than 0',
                                        },
                                        maxLength:{value:7,message:'Solo se permiten máximo 7 números'}
                                    }}
                                    render={({ field: { onChange, value },fieldState }) => (
                                    <CssTextField onChange={onChange} value={value} label={"Cantidad"} type="number"
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        sx={{width:'100%'}}
                                        InputProps={{ inputProps:{min:1}}}
                                    />
                                    )}
                                />
                            </div>
                            <div className="col">
                                <LoadingButton
                                    sx={{'color':'white','backgroundColor':'rgb(2, 185, 155)',
                                        ':hover': {
                                            // bgcolor: '#09A28A', // theme.palette.primary.main
                                            bgcolor:'rgb(4, 138, 115)',
                                            color: 'white',
                                        }
                                    ,}}
                                    type="submit"
                                    loading={loading}
                                    size="medium"
                                    loadingPosition="center"
                                    endIcon={<FontAwesomeIcon icon={faPlus}  />}
                                    variant="contained"
                                >Agregar</LoadingButton>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col">
                                {products.data && !!products.data.length &&
                                    <div style={{ height: 300, width: '100%' }}>
            
                                        <DataGrid rows={rows} columns={columns}
                                            hideFooterPagination
                                            disableColumnMenu
                                            getRowHeight={() => 'auto'}
                                            //rowHeight={35}
                                        // onCellEditStop={(params)=>handleChangeCell(params)}
                                            //processRowUpdate={processRowUpdate}
                                            //onProcessRowUpdateError={handleProcessRowUpdateError}
                                            getRowId={(row) => row.id}
                                            hideFooterSelectedRowCount
                                            experimentalFeatures={{ newEditingApi: true }}
                                            components={{
                                                Footer: CustomFooter,
                                            }}
                                            componentsProps={{
                                                footer: { total: rowCount }
                                            }}
                                        />
                                    </div>
                                }
            
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col text-start">
                            <span className="fs-3 fw-light">TOTAL:</span><span className="fw-semibold fs-4"> {Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(total)}</span>
                            </div>
                            <div className="col align-self-center text-end">
                                <LoadingButton
                                    sx={{'color':'white','backgroundColor':'rgb(23, 43, 101)',
                                        ':hover': {
                                            // bgcolor: '#09A28A', // theme.palette.primary.main
                                            bgcolor:'rgb(10, 25, 41)',
                                            color: 'white',
                                        }
                                    ,}}
                                    onClick={confirmSale}
                                    loading={saving}
                                    loadingPosition="center"
                                    disabled={rows.length>0?false:true}
                                    endIcon={<FontAwesomeIcon icon={faCheck}  />}
                                    variant="contained"
                                >Confirmar</LoadingButton>
                            </div>
                        </div>
                    </form>
                </CardForm>
            </div>
        </>
    );
};
export default Venta;
