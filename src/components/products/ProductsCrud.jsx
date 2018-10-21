import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'shopping-cart',
    title: 'Produtos',
    subtitle: 'Cadastro de Produtos: Incluir, Listar Alterar e Excluir'
}

const baseUrl = 'http://localhost:3001/products'

const initialState = {
    product: { name: '', valor: ''},
    list: []
}

export default class ProductCrud extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp=> {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ product: initialState.product })
    }

    save() {
        const product = this.state.product
        const method = product.id ? 'put' : 'post'
        const url = product.id ? `${baseUrl}/${product.id}` : baseUrl
        axios[method](url, product)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ product: initialState.product, list })
            })

    }

    getUpdatedList(product, add = true) {
        const list = this.state.list.filter(u => u.id !== product.id)
        if(add) list.unshift(product)
        return list
    }

    updateField(event) {
        const product = { ...this.state.product }
        product[event.target.name] = event.target.value
        this.setState({ product })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome do produto</label>
                            <input type="text" className="form-control" 
                                name="name"
                                value={this.state.product.name}
                                onChange={ e => this.updateField(e) }
                                placeholder="Digite seu o nome"
                                />
                            
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Valor</label>
                            <input type="text" className="form-control" 
                                name="valor"
                                value={this.state.product.valor}
                                onChange={ e => this.updateField(e) }
                                placeholder="Digite o valor"
                                required
                                />
                            
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="col-12 d-flex justify-content-end">
                    <button className="btn btn-primary"
                        onClick={ e => this.save(e) }
                        onKeyPress={ 
                            e => this.updateField(e) 
                        }>
                        Salvar
                    </button>
                    <button className="btn btn-secundary ml-2"
                        onClick={ e => this.clear(e) }>
                        Cancelar
                    </button>
                </div>
            </div>
        )
    }

    load(product) {
        this.setState({ product })
    }
    
    remove(product) {
        axios.delete(`${baseUrl}/${product.id}`).then(resp => {
            const list = this.getUpdatedList(product, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Açôes</th>
                    </tr>
                </thead>       
                <tbody>
                    { this.renderRows() }
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(product => {
            return (
                <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.valor}</td>
                    <td width="150">
                        <button className="btn btn-warning"
                            onClick={() => this.load(product)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(product)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main { ...headerProps }>
                { this.renderForm() }
                { this.renderTable() }
            </Main>
        )
    }
}