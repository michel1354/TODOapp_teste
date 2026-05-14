import { Component, signal } from '@angular/core';
import { Tarefa } from "./tarefa";
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('TODOapp');

  arrayDeTarefas = signal<Tarefa[]>([]);
  arrayDeUsuarios = signal<any[]>([]);
  
  apiURL: string;
  token: string = '';
  isAdmin: boolean = false;
  usuarioLogado: string = '';
  
  mostraTelaUsuarios = signal(false);
  novoNomeUsuario = '';
  novaSenhaUsuario = '';
  novoIsAdminUsuario = false;
  usuarioEmEdicao: any = null;

  constructor(private http: HttpClient) {
    // Detecta se está em produção ou desenvolvimento
    const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname.includes('localhost');
    // Se estiver em desenvolvimento, usa localhost. Se estiver em produção com domínio customizado, usa para conectar no backend de produção
    if (isDevelopment) {
      this.apiURL = 'http://localhost:3000';
    } else if (window.location.hostname.includes('onrender.com')) {
      this.apiURL = 'https://apifarefas-michel-255441.onrender.com'; // URL do backend em produção
    } else {
      this.apiURL = 'http://localhost:3000'; // Padrão
    }
    
    // Recupera token e dados do usuário do localStorage
    const tokenSalvo = localStorage.getItem('id-token');
    const isAdminSalvo = localStorage.getItem('isAdmin');
    const usuarioSalvo = localStorage.getItem('usuarioLogado');
    
    if (tokenSalvo) {
      this.token = tokenSalvo;
      this.isAdmin = isAdminSalvo === 'true';
      this.usuarioLogado = usuarioSalvo || '';
      this.READ_tarefas();
    }
  }

  CREATE_tarefa(descricaoNovaTarefa: string) {
    var novaTarefa = new Tarefa(descricaoNovaTarefa, false);
    this.http.post<Tarefa>(`${this.apiURL}/api/post`, novaTarefa, {
      headers: { 'id-token': this.token }
    }).subscribe(
      (resultado : any) => { console.log(resultado); this.READ_tarefas(); });
    
  }

  READ_tarefas() {
    this.http.get<Tarefa[]>(`${this.apiURL}/api/getAll`, {
      headers: { 'id-token': this.token }
    }).subscribe(
      (resultado : any) => this.arrayDeTarefas.set(resultado.tarefas));
  }

  DELETE_tarefa(tarefaAserRemovida: Tarefa) {
    var indice = this.arrayDeTarefas().indexOf(tarefaAserRemovida);
    var id = this.arrayDeTarefas()[indice]._id;
    this.http.delete<Tarefa>(`${this.apiURL}/api/delete/${id}`, {
      headers: { 'id-token': this.token }
    }).subscribe(
      (resultado : any) => { console.log(resultado); this.READ_tarefas(); });
  }

  UPDATE_tarefa(tarefaAserModificada: Tarefa) {
    var indice = this.arrayDeTarefas().indexOf(tarefaAserModificada);
    var id = this.arrayDeTarefas()[indice]._id;
    this.http.patch<Tarefa>(`${this.apiURL}/api/update/${id}`,
    tarefaAserModificada, {
      headers: { 'id-token': this.token }
    }).subscribe(
    (resultado : any) => { console.log(resultado); this.READ_tarefas(); });
  }

  // ===== GERENCIAMENTO DE USUÁRIOS =====

  abrirTelaUsuarios() {
    this.mostraTelaUsuarios.set(true);
    this.READ_usuarios();
    this.limpaFormularioUsuario();
  }

  fecharTelaUsuarios() {
    this.mostraTelaUsuarios.set(false);
    this.limpaFormularioUsuario();
  }

  READ_usuarios() {
    this.http.get<any[]>(`${this.apiURL}/api/usuarios`, {
      headers: { 'id-token': this.token }
    }).subscribe(
      (resultado: any) => {
        this.arrayDeUsuarios.set(resultado);
        console.log('Usuários carregados:', resultado);
      },
      (erro: any) => {
        console.error('Erro ao carregar usuários:', erro);
        alert('Erro ao carregar usuários: ' + erro.error.message);
      }
    );
  }

  CREATE_usuario() {
    if (!this.novoNomeUsuario || !this.novaSenhaUsuario) {
      alert('Preencha nome e senha!');
      return;
    }

    const novoUsuario = {
      nome: this.novoNomeUsuario,
      senha: this.novaSenhaUsuario,
      isAdmin: this.novoIsAdminUsuario
    };

    this.http.post<any>(`${this.apiURL}/api/register`, novoUsuario, {
      headers: { 'id-token': this.token }
    }).subscribe(
      (resultado: any) => {
        console.log('Usuário criado:', resultado);
        alert('Usuário cadastrado com sucesso!');
        this.limpaFormularioUsuario();
        this.READ_usuarios();
      },
      (erro: any) => {
        console.error('Erro ao criar usuário:', erro);
        alert('Erro ao cadastrar: ' + erro.error.message);
      }
    );
  }

  UPDATE_usuario() {
    if (!this.usuarioEmEdicao) return;

    const dadosAtualizacao = {
      nome: this.novoNomeUsuario || this.usuarioEmEdicao.nome,
      isAdmin: this.novoIsAdminUsuario
    };

    this.http.patch<any>(`${this.apiURL}/api/usuarios/${this.usuarioEmEdicao._id}`, dadosAtualizacao, {
      headers: { 'id-token': this.token }
    }).subscribe(
      (resultado: any) => {
        console.log('Usuário atualizado:', resultado);
        alert('Usuário atualizado com sucesso!');
        this.limpaFormularioUsuario();
        this.READ_usuarios();
      },
      (erro: any) => {
        console.error('Erro ao atualizar usuário:', erro);
        alert('Erro ao atualizar: ' + erro.error.message);
      }
    );
  }

  DELETE_usuario(usuarioId: string) {
    if (!confirm('Tem certeza que deseja deletar este usuário?')) return;

    this.http.delete<any>(`${this.apiURL}/api/usuarios/${usuarioId}`, {
      headers: { 'id-token': this.token }
    }).subscribe(
      (resultado: any) => {
        console.log('Usuário deletado:', resultado);
        alert('Usuário deletado com sucesso!');
        this.READ_usuarios();
      },
      (erro: any) => {
        console.error('Erro ao deletar usuário:', erro);
        alert('Erro ao deletar: ' + erro.error.message);
      }
    );
  }

  iniciarEdicaoUsuario(usuario: any) {
    this.usuarioEmEdicao = usuario;
    this.novoNomeUsuario = usuario.nome;
    this.novoIsAdminUsuario = usuario.isAdmin;
    this.novaSenhaUsuario = ''; // Não preenchemos a senha
  }

  limpaFormularioUsuario() {
    this.novoNomeUsuario = '';
    this.novaSenhaUsuario = '';
    this.novoIsAdminUsuario = false;
    this.usuarioEmEdicao = null;
  }

  logout() {
    localStorage.removeItem('id-token');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('usuarioLogado');
    this.token = '';
    this.isAdmin = false;
    this.usuarioLogado = '';
    this.arrayDeTarefas.set([]);
    this.mostraTelaUsuarios.set(false);
  }

  fazerLogin() {
    if (!this.novoNomeUsuario || !this.novaSenhaUsuario) {
      alert('Preencha usuário e senha!');
      return;
    }

    const credenciais = {
      nome: this.novoNomeUsuario,
      senha: this.novaSenhaUsuario
    };

    this.http.post<any>(`${this.apiURL}/api/login`, credenciais).subscribe(
      (resultado: any) => {
        console.log('Login realizado:', resultado);
        if (!resultado || !resultado.token) {
          console.error('Resposta inválida da API:', resultado);
          alert('Erro: Resposta inválida do servidor. Verifique se a API está rodando.');
          this.novaSenhaUsuario = '';
          return;
        }
        
        this.token = resultado.token;
        this.isAdmin = resultado.isAdmin || false;
        this.usuarioLogado = this.novoNomeUsuario;
        
        // Salva no localStorage
        localStorage.setItem('id-token', resultado.token);
        localStorage.setItem('isAdmin', this.isAdmin.toString());
        localStorage.setItem('usuarioLogado', this.novoNomeUsuario);
        
        this.limpaFormularioUsuario();
        this.READ_tarefas();
      },
      (erro: any) => {
        console.error('Erro ao fazer login:', erro);
        const mensagem = erro?.error?.message || erro?.message || 'Erro desconhecido ao conectar com o servidor';
        alert('Erro ao fazer login: ' + mensagem);
        this.novaSenhaUsuario = '';
      }
    );
  }
   
}
