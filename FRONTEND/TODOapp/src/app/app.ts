import { Component, signal } from '@angular/core';
import { Tarefa } from "./tarefa";
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('TODOapp');

  arrayDeTarefas = signal<Tarefa[]>([]);
  usuarioLogado = signal(false);
  usuarioAdmin = signal(false);
  mostraCadastro = signal(false);
  tokenJWT = '{"token":""}';
  apiURL: string;
  constructor(private http: HttpClient) {
    // Detecta se está em produção ou desenvolvimento
    const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    this.apiURL = isDevelopment ? 'http://localhost:3000' : 'https://apitarefas-michel-255441.onrender.com';
  }

  login(username: string, password: string) {
    var credenciais = { "nome": username, "senha": password }
    this.http.post(`${this.apiURL}/api/login`, credenciais).subscribe(
      (resultado: any) => {
        this.tokenJWT = JSON.stringify(resultado);
        this.usuarioAdmin.set(resultado.isAdmin || false);
        this.READ_tarefas();
      },
      (error) => {
        alert('Login falhou!');
      }
    );
  }

  register(username: string, password: string, passwordConfirm: string) {
    if (password !== passwordConfirm) {
      alert('Senhas não conferem!');
      return;
    }
    if (username.trim() === '' || password.trim() === '') {
      alert('Preencha todos os campos!');
      return;
    }
    const idToken = new HttpHeaders().set("id-token", JSON.parse(this.tokenJWT).token);
    var credenciais = { "nome": username, "senha": password }
    this.http.post(`${this.apiURL}/api/register`, credenciais, { 'headers': idToken }).subscribe(
      (resultado: any) => {
        alert('Usuario cadastrado com sucesso!');
        this.mostraCadastro.set(false);
      },
      (error) => {
        alert('Erro ao cadastrar: ' + error.error.message);
      }
    );
  }

  CREATE_tarefa(descricaoNovaTarefa: string) {
    var novaTarefa = new Tarefa(descricaoNovaTarefa, false);
    const idToken = new HttpHeaders().set("id-token", JSON.parse(this.tokenJWT).token);
    this.http.post<Tarefa>(`${this.apiURL}/api/post`, novaTarefa, { 'headers': idToken }).subscribe(
      (resultado : any) => { console.log(resultado); this.READ_tarefas(); },
      (error) => { console.error(error); this.usuarioLogado.set(false); }
    );
    
  }


  READ_tarefas() {
    const idToken = new HttpHeaders().set("id-token", JSON.parse(this.tokenJWT).token);
    this.http.get<Tarefa[]>(`${this.apiURL}/api/getAll`, { 'headers': idToken }).subscribe(
      (resultado : any) => { this.arrayDeTarefas.set(resultado.tarefas); this.usuarioLogado.set(true) },
      (error) => { this.usuarioLogado.set(false) }
    );
  }

  DELETE_tarefa(tarefaAserRemovida: Tarefa) {
    var indice = this.arrayDeTarefas().indexOf(tarefaAserRemovida);
    var id = this.arrayDeTarefas()[indice]._id;
    const idToken = new HttpHeaders().set("id-token", JSON.parse(this.tokenJWT).token);
    this.http.delete<Tarefa>(`${this.apiURL}/api/delete/${id}`, { 'headers': idToken }).subscribe(
      (resultado : any) => { console.log(resultado); this.READ_tarefas(); },
      (error) => { console.error(error); this.usuarioLogado.set(false); }
    );
  }

  UPDATE_tarefa(tarefaAserModificada: Tarefa) {
    var indice = this.arrayDeTarefas().indexOf(tarefaAserModificada);
    var id = this.arrayDeTarefas()[indice]._id;
    const idToken = new HttpHeaders().set("id-token", JSON.parse(this.tokenJWT).token);
    this.http.patch<Tarefa>(`${this.apiURL}/api/update/${id}`, tarefaAserModificada, { 'headers': idToken }).subscribe(
      (resultado : any) => { console.log(resultado); this.READ_tarefas(); },
      (error) => { console.error(error); this.usuarioLogado.set(false); }
    );
  }
   
}
