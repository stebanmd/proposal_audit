(function () {
	'use strict';

	angular
		.module('PropostasApp.cadastro')
		.controller('PropostaCtrl', PropostaCtrl)

	/** @ngInject */
	function PropostaCtrl($state, $stateParams, $rootScope, CadastroViewService, PropostaDataService, Utils,
		FornecedorDataService, CategoriaDataService, SessionService, $timeout, AppConfigs) {
		var vm = this;

		var model = {};
		var filtro = {};
		var lista = [];
		
		model.arrayStatus = [
			{
				description: 'Em Aberto',
				value: 0
			},
			{
				description: 'Aprovada',
				value: 1
			},
			{
				description: 'Reprovada',
				value: 2
			},
			{
				description: 'Pendente Diretoria',
				value: 3
			},
		]

		angular.extend(this, {
			vm: vm,
			model: model,
			filtro: filtro,
			lista: lista,
			
			init: init,
			pesquisar: pesquisar,
			remover: remover,
			editar: editar,
			salvar: salvar,

			preparaFormEdit: preparaFormEdit,
			preparaFiltro: preparaFiltro,
			verHistorico: verHistorico,
			aprovar: aprovar,
			reprovar: reprovar,
			addArquivo: addArquivo
		});

		function init() {
			CadastroViewService.setView('proposta');
			model.Usuario = JSON.parse(SessionService.get('CurrentUser'));
			vm.hist = [];
		}

		function addArquivo(event) {
			if (event.target && event.target.files[0]) {
				model.Arquivo = {};

				Utils.getBase64(event.target.files[0])
					.then(function (response) {
						var arquivo = response.replace(/^data:([a-z]?[\/\-\.]?)+;base64,/, '');
						//var mimeType = objFile.substring(objFile.indexOf(":") + 1, objFile.indexOf(";"));

						model.Arquivo.ArquivoBase64 = arquivo;
						model.Arquivo.NomeArquivo = event.target.files[0].name;
						model.Arquivo.Extensao = event.target.files[0].name.substr(event.target.files[0].name.lastIndexOf('.'));
					})
			}

		}

		function downloadFile() {

			if (!Utils.isNullOrUndefined(conversa.Arquivo)) {
				var anchor = angular.element('<a/>');
				anchor.attr({
					href: Utils.downloadBase64(conversa.Arquivo, 'application/pdf'),
					target: '_blank',
					download: "arquivo pdf da proposta.pdf"
				})[0].click();
			}
		}

		function pesquisar() {
			startSpin();
			if (validaFiltro()) {
				vm.filtro.DataInicial = Utils.toSystemDate(vm.filtro.DataInicialFormatada);
				vm.filtro.DataFinal = Utils.toSystemDate(vm.filtro.DataFinalFormatada);

				PropostaDataService.pesquisarPropostas(vm.filtro)
					.then(function (response) {
						if (response.data.length === 0) {
							$rootScope.openModal('Aviso', 'Não foi localizado nenhuma proposta com o filtro informado.');
						}
						vm.lista = [];
						for (var i = 0; i < response.data.length; i++) {
							vm.lista.push(response.data[i]);
						}
						stopSpin();
					});
			} else {
				stopSpin();
			}
		}

		function remover(entity) {
			if (entity.Status === 0 || entity.Status === 2) {
				$rootScope.openModal('Erro!', 'Confirma a remoção do registro?', true)
					.then(function () {
						startSpin();
						PropostaDataService.removerProposta(entity.ID)
							.then(function (response) {
								vm.lista = [];
								$rootScope.openModal('Sucesso!', response.data.Mensagem, false);
								stopSpin();
							})
							.catch(function (err) {
								$rootScope.openModal('Erro!', err.data.Mensagem, false);
								stopSpin();
							})
					})
			} else {
				$rootScope.openModal('Erro!', 'Não é possível excluir essa proposta pois ela encontra-se ' + entity.StatusStr);
			}
		}

		function aprovar(entity) {
			if (vm.model.Usuario.Perfil === 'AnalistaComercial') {
				$rootScope.openModal('Erro!', 'Usuário sem permissão para acessar essa função');
			} else {
				if (entity.Status === 0 || (entity.Status === 3 && model.Usuario.Perfil === 'DiretorFinanceiro')) {
					$rootScope.openModal('Confirmação', 'Confirma a aprovação da Proposta?', true)
						.then(function () {
							startSpin();
							PropostaDataService.aprovarProposta(entity.ID)
								.then(function (response) {
									vm.lista = [];
									$rootScope.openModal('Sucesso!', response.data.Mensagem, false);
									stopSpin();
								})
								.catch(function (err) {
									$rootScope.openModal('Erro!', err.data.Mensagem, false);
									stopSpin();
								})
						})
				} else {
					$rootScope.openModal('Erro!', 'Não é possível aprovar essa proposta, pois não está em aberto');
				}				
			}
		}

		function reprovar(entity) {
			if (vm.model.Usuario.Perfil === 'AnalistaComercial') {
				$rootScope.openModal('Erro!', 'Usuário sem permissão para acessar essa função');
			} else {
				if (entity.Status === 0 || (entity.Status === 3 && vm.model.Usuario.Perfil === 'DiretorFinanceiro')) {
					$rootScope.openModal('Confirmação', 'Confirma a reprovação da Proposta?', true)
						.then(function () {
							startSpin();
							PropostaDataService.reprovarProposta(entity.ID)
								.then(function (response) {
									vm.lista = [];
									$rootScope.openModal('Sucesso!', response.data.Mensagem, false);
									stopSpin();
								})
								.catch(function (err) {
									$rootScope.openModal('Erro!', err.data.Mensagem, false);
									stopSpin();
								})
						})
				} else {
					$rootScope.openModal('Erro!', 'Não é possível reprovar essa proposta, pois ela encontra-se ' + entity.StatusStr);
				}
			}
		}

		function editar(id) {
			PropostaDataService.carregarProposta(id)
				.then(function (response) {
					vm.model.Proposta = response.data;
					vm.model.Proposta.DataFormatada = Utils.toLocalDate(vm.model.Proposta.Data);

					if (!Utils.isNullOrEmpty(vm.model.Proposta.Arquivo) ){
						vm.model.Proposta.CaminhoArquivo = AppConfigs.apiEndpoint + '/' + vm.model.Proposta.CaminhoArquivo;
					}
				})
		}

		function salvar() {
			startSpin();

			if (validaProposta()) {

				vm.model.Proposta.Data = Utils.toSystemDate(vm.model.Proposta.DataFormatada);
				PropostaDataService.salvarProposta(model.Proposta)
					.then(function (response) {
						if (response.data.Sucesso) {

							if (model.Arquivo && !Utils.isNullOrEmpty(model.Arquivo.ArquivoBase64)) {
								model.Arquivo.IdProposta = response.data.Retorno.ID;
								PropostaDataService.uploadArquivo(model.Arquivo)
									.then(function(resp) {
										if (resp.data.Sucesso) {
											model.Proposta = undefined;
											model.Arquivo = undefined;
											$state.go('root.proposta-list');
										}
										else {
											$rootScope.openModal('Erro!', response.data.Mensagem, false);
										}
									})
									.catch(function(err) {
										var msg = 'Não foi possível efetuar o upload do arquivo!';
										if (err.data.hasOwnProperty('Mensagem')) {
											msg = err.data.Mensagem;
										}
										$rootScope.openModal('Erro!', msg, false);
										stopSpin();
									})
							}
							else {
								model.Proposta = undefined;
								$state.go('root.proposta-list');
							}
						} else {
							$rootScope.openModal('Erro!', response.data.Mensagem, false);
						}
						stopSpin();
					})
					.catch(function (err) {
						var msg = 'Não é possível salvar o registro. Por favor contacte o administrador';
						if (err.data.hasOwnProperty('Mensagem')) {
							msg = err.data.Mensagem;
						}
						$rootScope.openModal('Erro!', msg, false);
						stopSpin();
					})

			} else {
				stopSpin();
			}
		}

		function validaProposta() {
			if (Utils.isNullOrEmpty(model.Proposta.Nome)) {
				$rootScope.openModal('Aviso!', 'Por favor, informe o nome');
				return false;
			}
			if (typeof vm.model.Proposta.DataFormatada === 'undefined' || vm.model.Proposta.DataFormatada == '' || (!Utils.isValidDate(vm.model.Proposta.DataFormatada))) {
				$rootScope.openModal('Aviso!', 'Por favor, informe uma data válida');
				return false;
			}
			if (vm.model.Proposta.IdCategoria === 0 || vm.model.Proposta.IdCategoria === '' || vm.model.Proposta.IdCategoria === undefined) {
				$rootScope.openModal('Aviso!', 'Por favor, informe a categoria');
				return false;
			}
			if (vm.model.Proposta.IdFornecedor === 0 || vm.model.Proposta.IdFornecedor === '' || vm.model.Proposta.IdFornecedor === undefined) {
				$rootScope.openModal('Aviso!', 'Por favor, informe o fornecedor');
				return false;
			}
			if (vm.model.Proposta.Valor === 0 || vm.model.Proposta.Valor === '' || vm.model.Proposta.Valor === undefined) {
				$rootScope.openModal('Aviso!', 'Por favor, informe o valor da proposta.');
				return false;
			}

			return true;
		}

		function preparaFormEdit() {
			startSpin();

			carregaCategorias();
			carregaFornecedores();

			if (!Utils.isNullOrEmpty($stateParams.id)) {
				editar($stateParams.id);
			} else {
				vm.model.Proposta = {};
				vm.model.Proposta.DataFormatada = Utils.toLocalDate(new Date());
				vm.model.Proposta.StatusStr = "Em Análise";
			}

			$timeout(function () {
				aplicaMask();
				stopSpin();
			}, 1000);
		}

		function verHistorico() {
			startSpin();

			vm.model.Historico = {};
			if (Utils.isNullOrEmpty($stateParams.id)) {
				$rootScope.openModal('Erro!', 'Chamada incorreta');
				stopSpin();
			} else {
				PropostaDataService.carregarHistorico($stateParams.id)
					.then(function (response) {
						vm.model.Historico = response.data;
						if (vm.model.Historico.Arquivo) {
							vm.model.Historico.CaminhoArquivo = AppConfigs.apiEndpoint + '/' + vm.model.Historico.CaminhoArquivo;
						}
						stopSpin();
					})
			}
		}

		function preparaFiltro() {
			startSpin();
			vm.filtro = {};

			var dataAux = new Date();
			vm.filtro.DataFinalFormatada = Utils.toLocalDate(dataAux);
			dataAux.setDate(dataAux.getDate()-1);
			vm.filtro.DataInicialFormatada = Utils.toLocalDate(dataAux);
			vm.filtro.Status = 0;
			vm.filtro.IdCategoria = 0;

			carregaCategorias();

			$timeout(function () {
				aplicaMask();
				stopSpin();
			}, 1000);
		}

		function validaFiltro() {
			if (typeof vm.filtro.DataInicialFormatada === 'undefined' || vm.filtro.DataInicialFormatada == '' || (!Utils.isValidDate(vm.filtro.DataInicialFormatada))) {
				$rootScope.openModal('Aviso!', 'Data inicial inválida', false);
				return false;
			}
			if (typeof vm.filtro.DataFinalFormatada === 'undefined' || vm.filtro.DataFinalFormatada == '' || (!Utils.isValidDate(vm.filtro.DataFinalFormatada))) {
				$rootScope.openModal('Aviso!', 'Data final inválida', false);
				return false
			}
			if (vm.filtro.Status === '' || vm.filtro.Status === undefined) {
				$rootScope.openModal('Aviso!', 'Por favor, informe o status da proposta', false);
				return false;
			}
			return true;
		}

		function aplicaMask() {
			$('.date').mask('00/00/0000', {
				placeholder: "__/__/____"
			});
		}

		function carregaCategorias() {
			CategoriaDataService.listarCategorias()
				.then(function (response) {
					vm.model.listaCategorias = [];
					vm.model.listaCategorias.push({
						ID: 0,
						Nome: "Selecione..."
					});
					for (let i = 0; i < response.data.length; i++) {
						vm.model.listaCategorias.push(response.data[i]);
					}
				})
		}

		function carregaFornecedores() {
			FornecedorDataService.listarFornecedores()
				.then(function (response) {
					vm.model.listaFornecedores = [];
					vm.model.listaFornecedores.push({
						ID: 0,
						Nome: "Selecione..."
					});
					for (let i = 0; i < response.data.length; i++) {
						vm.model.listaFornecedores.push(response.data[i]);
					}
				})
		}

		function startSpin() {
			$('body').loading({
				message: "Aguarde..."
			});
		}

		function stopSpin() {
			$('body').loading('stop');
		}

	}
}());
