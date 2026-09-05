/* Banco de dados local: todo o conteúdo do jogo vive neste arquivo. */
const POSITION_DATA = {
  atacante:{label:'Atacante',abbr:'ATA',base:{finishing:76,speed:74,passing:55,defense:28,physical:62,charisma:60},focus:'Finalização'},
  meia:{label:'Meia',abbr:'MEI',base:{finishing:59,speed:64,passing:78,defense:42,physical:52,charisma:68},focus:'Passe'},
  volante:{label:'Volante',abbr:'VOL',base:{finishing:43,speed:58,passing:72,defense:78,physical:73,charisma:46},focus:'Defesa'},
  lateral:{label:'Lateral',abbr:'LAT',base:{finishing:42,speed:82,passing:68,defense:69,physical:65,charisma:48},focus:'Velocidade'},
  zagueiro:{label:'Zagueiro',abbr:'ZAG',base:{finishing:22,speed:47,passing:50,defense:84,physical:86,charisma:40},focus:'Defesa'},
  goleiro:{label:'Goleiro',abbr:'GOL',base:{finishing:10,speed:38,passing:44,defense:88,physical:70,charisma:51},focus:'Defesa'}
};
const TRAITS = {
  disciplinado:{label:'Disciplinado',desc:'Evolui com constância e evita problemas.',effects:{morale:5,club:5,physical:3}},
  rebelde:{label:'Rebelde',desc:'Carisma alto, mas cada manchete tem um preço.',effects:{charisma:8,popularity:6,club:-4}},
  trabalhador:{label:'Trabalhador',desc:'Treinos extras aceleram seus atributos.',effects:{physical:6,passing:3,morale:3}},
  prodigio:{label:'Prodígio',desc:'Brilha cedo, sob pressão para confirmar.',effects:{finishing:5,speed:5,charisma:4,morale:-2}}
};
const CLUBS = ['Atlético Aurora','União do Vale','Estrela do Norte','Porto Dourado','Real Serrano','Ferroviária Azul'];
const EVENT_SEEDS = [
['A peneira que parou o bairro','Um vídeo do seu treino circula nos grupos da cidade. De repente, todo mundo tem uma opinião sobre o seu próximo passo.','BASTIDORES'],
['O primeiro treino entre os grandes','O técnico pede intensidade no coletivo. Um veterano observa cada movimento seu em silêncio.','TREINO'],
['A disputa pela camisa','A vaga de titular ficou aberta após uma suspensão. O vestiário quer saber se você está pronto.','VESTIÁRIO'],
['O empresário de duas faces','Uma pasta elegante aparece no seu armário com uma proposta tentadora e várias letras pequenas.','MERCADO'],
['Chuva no dia do clássico','O gramado virou um campo de batalha. O plano seguro parece menos bonito, mas pode valer três pontos.','JOGO'],
['A entrevista depois do apito','Um repórter pergunta se você se considera maior que o clube que o revelou. A câmera está ligada.','MÍDIA'],
['O jantar da diretoria','Dirigentes querem ouvir seus planos antes de oferecer a renovação.','CONTRATO'],
['O novo reforço','Chega um atleta caro para jogar exatamente na sua posição. A disputa começa antes do primeiro treino.','VESTIÁRIO'],
['A torcida cobra resposta','Cartazes aparecem no portão do centro de treinamento depois de três partidas sem vitória.','TORCIDA'],
['A viagem que não termina','Uma conexão cancelada deixa o elenco horas preso no aeroporto antes da partida decisiva.','BASTIDORES'],
['O treino de finalizações','O auxiliar oferece uma sessão extra ao amanhecer. É cansativo, mas ninguém esquece quem fica.','TREINO'],
['Um silêncio no vestiário','A equipe perdeu a confiança. Alguém precisa falar, mesmo sem ter todas as respostas.','VESTIÁRIO'],
['A sondagem estrangeira','Um clube da Liga Continental manda olheiros para acompanhar seus minutos.','MERCADO'],
['A capa de amanhã','Um jornal prepara uma manchete dizendo que você é a próxima grande estrela. O jogo ainda nem aconteceu.','MÍDIA'],
['O contrato na mesa','Seu vínculo termina em poucos meses e a diretoria apresenta três caminhos possíveis.','CONTRATO'],
['O campo pesado','A bola para nas poças e o jogo pede inteligência para sobreviver aos noventa minutos.','JOGO'],
['O capitão machucado','A faixa está sem dono e todos olham na sua direção antes da preleção.','VESTIÁRIO'],
['A promessa da base','Um jovem talentoso pede conselhos depois de ouvir que não tem espaço no elenco.','BASTIDORES'],
['O fotógrafo indiscreto','Uma foto sua em uma festa é publicada fora de contexto na véspera do clássico.','MÍDIA'],
['A multa rescisória','Um intermediário quer reduzir sua multa para facilitar uma transferência futura.','CONTRATO'],
['O estádio sem voz','A torcida protesta e o jogo começa em um silêncio estranho.','TORCIDA'],
['O ônibus da equipe','Uma pane faz o elenco caminhar até o estádio. O aquecimento será improvisado.','BASTIDORES'],
['O professor exigente','O treinador muda sua função tática e espera que você aprenda um papel novo em uma semana.','TREINO'],
['A noite da revanche','O adversário que eliminou o clube volta ao seu estádio. A memória ainda dói.','JOGO'],
['A coletiva em rede nacional','Uma pergunta sobre sua infância vira o assunto principal da entrevista.','MÍDIA'],
['O bônus por desempenho','O clube oferece uma premiação por metas, mas exige compromissos de treino e comportamento.','CONTRATO'],
['A arquibancada visitante','A vaia começa no aquecimento e aumenta a cada toque na bola.','TORCIDA'],
['A ligação da família','Uma notícia de casa chega horas antes de uma partida importante.','BASTIDORES'],
['O desafio do analista','Dados apontam uma fraqueza no seu jogo. Você decide como reagir ao relatório.','TREINO'],
['A final regional','O troféu mais antigo da sala do clube está a noventa minutos de distância.','JOGO'],
['O rumor no mercado','Seu nome aparece em uma lista de possíveis contratações de um rival histórico.','MERCADO'],
['A crítica do ídolo','Um ex-jogador respeitado diz que falta personalidade ao seu futebol.','MÍDIA'],
['A renovação com metas','A diretoria quer atrelar seu salário a gols, jogos ou desarmes.','CONTRATO'],
['O companheiro esquecido','Um veterano perde espaço e pede que você não deixe o grupo se dividir.','VESTIÁRIO'],
['A concentração sem sono','O barulho do hotel não deixa ninguém descansar antes do jogo.','BASTIDORES'],
['A nova chuteira','Uma marca fictícia oferece equipamento experimental em troca de exposição.','MERCADO'],
['A torcida mirim','Crianças esperam no portão por horas para conseguir um autógrafo seu.','TORCIDA'],
['O retorno após contusão','Você está liberado, mas o departamento médico recomenda minutos controlados.','TREINO'],
['O jogo de seis pontos','O adversário direto na tabela chega embalado para a partida mais importante do mês.','JOGO'],
['A capa negativa','Uma coluna publica que sua carreira estacionou. O vestiário lê em voz alta.','MÍDIA'],
['O bônus da classificação','A direção promete dinheiro extra se o elenco alcançar a competição continental.','CONTRATO'],
['O pedido de desculpas','Um companheiro erra e a torcida escolhe você como porta-voz do grupo.','VESTIÁRIO'],
['A proposta milionária','Um projeto ambicioso da Liga Continental quer construir o time ao seu redor.','MERCADO'],
['O domingo sem folga','A comissão marca treino no dia reservado à família. Você precisa escolher sua prioridade.','TREINO'],
['O gol anulado','Uma decisão controversa muda o rumo do clássico e a imprensa quer sua reação.','JOGO'],
['A transmissão viral','Um gesto seu na comemoração ganha milhões de visualizações em um dia.','MÍDIA'],
['A cláusula secreta','Seu agente descobre que o contrato antigo tem uma condição pouco conhecida.','CONTRATO'],
['O banco de reservas','Você começa uma partida importante entre os suplentes pela primeira vez na temporada.','VESTIÁRIO'],
['O temporal na viagem','A delegação considera adiar o jogo, mas o calendário não perdoa.','BASTIDORES'],
['O duelo de velocidade','O adversário explora seu lado do campo e o plano precisa mudar em tempo real.','TREINO'],
['A semifinal improvável','Ninguém esperava o clube entre os quatro melhores. Agora a pressão é real.','JOGO'],
['O microfone aberto','Uma conversa privada sobre o calendário é captada por um jornalista.','MÍDIA'],
['A camisa dez disponível','O número mais simbólico do clube fica livre e a diretoria pergunta se você quer o peso.','CONTRATO'],
['A vaia que vira aplauso','Depois de um erro, a torcida canta seu nome no lance seguinte.','TORCIDA'],
['A reunião do elenco','O grupo precisa decidir se fará uma ação social durante a semana de folga.','BASTIDORES'],
['A análise do rival','O auxiliar entrega um vídeo de quarenta minutos sobre o próximo adversário.','TREINO'],
['A decisão nos pênaltis','O placar está empatado e seu nome aparece entre os cobradores.','JOGO'],
['O documentário da carreira','Uma equipe de filmagem quer acompanhar sua rotina por um mês.','MÍDIA'],
['A última oferta','O clube apresenta a proposta final antes de colocar seu nome na lista de transferências.','CONTRATO'],
['O pedido do treinador','A equipe precisa de você fora da posição em uma partida de emergência.','VESTIÁRIO'],
['O olheiro na arquibancada','Um observador misterioso anota cada toque seu durante um jogo discreto.','MERCADO'],
['A viagem da seleção','A federação convoca atletas para representar o país em uma série de amistosos.','SELEÇÃO'],
['O recorde do clube','Você está a poucos gols, assistências ou jogos de entrar para a história do Aurora.','MARCO'],
['A Bola de Ouro regional','Seu nome aparece entre os finalistas do prêmio individual mais cobiçado do continente.','PRÊMIO'],
['A final continental','O título que muda uma geração será decidido em um estádio neutro.','JOGO'],
['O corpo pede pausa','Exames mostram desgaste elevado e o médico recomenda uma escolha difícil.','LESÃO'],
['O último contrato','Aos trinta e cinco, a diretoria oferece mais um ano, mas com papel reduzido.','CONTRATO'],
['A despedida do capitão','O líder histórico anuncia que vai parar e entrega a braçadeira a você.','MARCO'],
['A convocação histórica','Seu desempenho torna impossível ignorar seu nome na lista principal da seleção.','SELEÇÃO'],
['A noite do recorde','Você pode quebrar a marca de gols, jogos ou defesas decisivas do campeonato.','MARCO'],
['A estátua no corredor','O clube propõe eternizar sua passagem com uma homenagem inédita.','PRÊMIO'],
['O adeus aos gramados','O estádio prepara uma última partida e espera que você escolha como quer ser lembrado.','DESPEDIDA']
];
function makeChoices(index, category){
  const sets=[
    [{label:'Assumir a responsabilidade',effects:{morale:8,club:5,popularity:5,focus:2}},{label:'Trabalhar em silêncio',effects:{morale:3,physical:5,focus:4}},{label:'Proteger seu espaço',effects:{charisma:5,club:-2,money:3}}],
    [{label:'Aceitar o desafio',effects:{morale:7,focus:5,physical:-2,popularity:3}},{label:'Pedir tempo ao treinador',effects:{club:4,morale:2,focus:2}},{label:'Mudar de ambiente',effects:{club:-7,money:10,popularity:4}}],
    [{label:'Falar com o grupo',effects:{charisma:7,club:6,morale:5}},{label:'Deixar o futebol falar',effects:{focus:7,morale:2}},{label:'Exigir reconhecimento',effects:{popularity:8,club:-5,money:5}}],
    [{label:'Ficar e construir legado',effects:{club:9,morale:6,focus:3,money:-2}},{label:'Ouvir a proposta',effects:{money:15,popularity:7,club:-3}},{label:'Confiar no agente',effects:{money:8,club:-5,injury:4}}]
  ];
  let choices=sets[index%sets.length].map(choice=>({...choice,effects:{...choice.effects}}));
  if(category==='LESÃO'){choices=[{label:'Respeitar a recuperação',effects:{injury:-15,morale:3,physical:2}},{label:'Jogar no sacrifício',effects:{injury:18,morale:7,focus:5}},{label:'Buscar segunda opinião',effects:{injury:-7,money:-6,club:2}}]}
  if(category==='SELEÇÃO'){choices=[{label:'Aceitar a convocação',effects:{popularity:12,morale:10,focus:5,money:4}},{label:'Pedir dispensa e descansar',effects:{physical:8,morale:-3}},{label:'Lutar pela titularidade',effects:{popularity:15,physical:-5,club:2}}]}
  if(category==='PRÊMIO'){choices=[{label:'Dedicar ao elenco',effects:{charisma:8,club:8,morale:8,popularity:5}},{label:'Usar o palco para cobrar',effects:{popularity:12,club:-4,money:6}},{label:'Manter os pés no chão',effects:{morale:5,focus:5,physical:3}}]}
  return choices;
}
const EVENTS=EVENT_SEEDS.map((seed,index)=>({id:`event-${index+1}`,title:seed[0],text:seed[1],category:seed[2],rarity:index>=60?'special':'normal',position:index===2?['atacante','meia','volante']:index===18?['goleiro','zagueiro']:null,choices:makeChoices(index,seed[2])}));

// Pool de cartas fictícias. A ordem dos números é: velocidade, finalização,
// passe, drible, defesa, físico, dribles especiais e perna ruim.
const LEGENDS = [
  ['Nilo Relâmpago','Anos 60','Ponta de ruptura',[96,78,61,93,28,70,95,72]],['Baltazar do Prata','Anos 60','Centroavante clássico',[68,94,53,72,25,91,74,80]],['Professor Jatobá','Anos 60','Meio-campo cerebral',[55,62,97,70,64,68,62,93]],['Muralha de Cobre','Anos 60','Zagueiro imponente',[44,24,58,31,96,94,28,61]],
  ['Luzia Canhota','Anos 70','Meia criativa',[74,77,91,88,36,64,86,98]],['Trovão do Sertão','Anos 70','Segundo atacante',[91,90,69,89,30,82,92,65]],['General da Área','Anos 70','Volante marcador',[58,38,79,42,92,88,35,77]],['Vento de Marfim','Anos 70','Lateral incansável',[93,45,76,73,78,85,66,70]],
  ['Maestro do Estuário','Anos 80','Meia-atacante',[81,84,96,91,39,71,94,90]],['Falcão de Neon','Anos 80','Ponta imprevisível',[98,83,68,97,22,66,99,74]],['César Trincheira','Anos 80','Zagueiro técnico',[55,31,72,52,91,86,48,83]],['Aço do Litoral','Anos 80','Lateral de força',[85,43,70,58,89,92,44,76]],
  ['Ritmo de Safira','Anos 80','Centroavante móvel',[88,96,62,86,23,87,90,81]],['Olho de Águia','Anos 80','Goleiro de reflexo',[64,12,58,15,98,83,22,54]],['Arquiteta do Campo','Anos 80','Volante passadora',[61,47,98,63,83,75,51,95]],['Rei do Compasso','Anos 80','Meia clássico',[65,70,99,79,43,69,75,97]],
  ['R9 da Várzea','Anos 90','Centroavante explosivo',[95,98,70,96,18,92,99,78]],['El Maestro do Prata','Anos 90','Meia de controle',[72,75,99,84,57,76,79,98]],['Mina de Aço','Anos 90','Zagueiro de duelo',[48,19,54,28,99,97,30,59]],['Fita na Linha','Anos 90','Lateral ofensivo',[94,51,83,91,66,78,87,82]],
  ['Rainha do Corte','Anos 90','Ponta dribladora',[97,86,73,99,27,64,99,88]],['Pulmão Azul','Anos 90','Volante box-to-box',[82,57,84,59,90,95,48,79]],['Canhão de Esmeralda','Anos 90','Segundo atacante',[87,97,67,83,24,89,82,96]],['Torre do Vale','Anos 90','Zagueiro aéreo',[42,36,66,24,94,98,20,71]],
  ['Cometa de Vidro','Anos 2000','Ponta vertical',[99,91,74,94,21,73,93,84]],['Bússola de Ouro','Anos 2000','Meio-campo total',[78,69,96,78,72,81,68,92]],['Trator Elegante','Anos 2000','Lateral completo',[89,48,87,69,86,90,57,86]],['Parede de Granito','Anos 2000','Zagueiro líder',[51,22,61,32,98,96,34,64]],
  ['Finta Lunar','Anos 2000','Meia-atacante',[86,88,90,98,34,68,98,91]],['Furacão de Âmbar','Anos 2000','Centroavante veloz',[94,99,59,90,16,94,95,76]],['Radar do Meio','Anos 2000','Volante construtor',[68,46,95,55,88,84,42,96]],['Mãos de Seda','Anos 2000','Goleiro moderno',[71,9,73,17,97,79,31,68]],
  ['Faísca do Norte','Atual','Ponta de um contra um',[98,87,79,96,29,69,97,86]],['Engenheiro da Bola','Atual','Meia de passe',[76,73,99,82,48,70,72,99]],['Sentinela Solar','Atual','Volante intenso',[75,42,88,61,93,91,54,84]],['Avenida Sete','Atual','Lateral de chegada',[96,61,89,85,75,83,80,81]],
  ['Imperador da Área','Atual','Centroavante completo',[84,99,71,88,26,96,91,89]],['Xadrez de Titânio','Atual','Zagueiro construtor',[59,29,84,47,95,91,41,88]],['Mágica de Bolso','Atual','Segundo atacante',[90,93,82,99,31,76,99,94]],['Farol da Meta','Atual','Goleiro líder',[69,11,80,12,99,87,26,73]],
  ['Lobo do Asfalto','Atual','Ponta de pressão',[93,82,65,90,52,88,84,75]],['Dama do Passe Longo','Atual','Meia lançadora',[67,64,98,76,44,73,63,97]],['Coração de Ferro','Atual','Volante de combate',[70,34,77,48,97,99,29,69]],['Pé de Veludo','Atual','Meia-atacante técnico',[80,89,94,95,35,67,96,99]],
  ['Meteoro do Vale','Atual','Centroavante de transição',[97,95,66,92,20,90,94,83]],['Capitã Aurora','Atual','Lateral líder',[91,55,92,72,82,86,61,90]],['Bastião Rubro','Atual','Zagueiro clássico',[46,27,63,33,97,95,25,67]],['Oráculo da Trave','Atual','Goleiro completo',[77,8,78,14,98,88,35,78]]
].map((item,index)=>({id:`legend-${index+1}`,name:item[0],era:item[1],style:item[2],attributes:{speed:item[3][0],finishing:item[3][1],passing:item[3][2],dribbling:item[3][3],defense:item[3][4],physical:item[3][5],special:item[3][6],weakFoot:item[3][7]}}));

const NATIONAL_TEAMS=['Aurora','Bravéria','Costa do Sol','Dourânia','Estelária','Fluméria','Granito','Ilhabela','Jatobá','Lunária','Montávia','Nortênia','Ourovia','Pradália','Rivéria','Serrânia','Terralta','Valdora'];
const DRAFT_POSITIONS=[['zagueiro','Zagueiro'],['lateral','Lateral'],['volante','Volante'],['meia','Meio-campo'],['meia-atacante','Meia-atacante'],['ponta','Ponta'],['segundo-atacante','Segundo Atacante'],['centroavante','Centroavante']];
const DRAFT_ATTRIBUTES=[['speed','Velocidade'],['finishing','Finalização'],['passing','Passe'],['dribbling','Drible'],['defense','Defesa'],['physical','Físico'],['special','Dribles Especiais'],['weakFoot','Perna Ruim']];
const POSITION_WEIGHTS={zagueiro:{speed:.08,finishing:.04,passing:.09,dribbling:.04,defense:.31,physical:.28,special:.08,weakFoot:.08},lateral:{speed:.22,finishing:.07,passing:.15,dribbling:.15,defense:.18,physical:.12,special:.07,weakFoot:.04},volante:{speed:.09,finishing:.05,passing:.20,dribbling:.07,defense:.25,physical:.23,special:.06,weakFoot:.05},'meia-atacante':{speed:.12,finishing:.19,passing:.18,dribbling:.22,defense:.04,physical:.09,special:.11,weakFoot:.05},meia:{speed:.10,finishing:.10,passing:.27,dribbling:.17,defense:.10,physical:.15,special:.06,weakFoot:.05},ponta:{speed:.25,finishing:.18,passing:.10,dribbling:.25,defense:.03,physical:.09,special:.07,weakFoot:.03},'segundo-atacante':{speed:.16,finishing:.24,passing:.12,dribbling:.23,defense:.03,physical:.12,special:.07,weakFoot:.03},centroavante:{speed:.10,finishing:.33,passing:.07,dribbling:.25,defense:.02,physical:.16,special:.05,weakFoot:.02}};
const LEAGUES=[
  {name:'Liga dos Campos Baixos',strength:35,clubs:['Aurora do Interior','União Campestre','Vila Horizonte','Atlético Pioneiro']},{name:'Campeonato Serrano',strength:41,clubs:['Real Montanha','Lobos de Granito','Serra Clara','Vale Unido']},{name:'Liga das Marés',strength:47,clubs:['Porto das Ondas','Náutico Bravio','Maré Alta','Farol Azul']},{name:'Copa do Cerrado',strength:52,clubs:['Sol do Cerrado','Verde Central','Horizonte Oeste','Rastro Dourado']},{name:'Liga Metropolitana',strength:57,clubs:['Capital Nova','União Urbana','Distrito Solar','Central Imperial']},{name:'Circuito Continental',strength:63,clubs:['Aurora Continental','Atlético Meridian','Ponte Real','Estrela Global']},{name:'Liga das Capitais',strength:69,clubs:['Capital de Prata','Leões do Centro','Porto Imperial','Nação Atlética']},{name:'Superliga de Cristal',strength:75,clubs:['Cristal FC','Diamante Azul','Vanguarda Real','Coroa do Norte']},{name:'Liga dos Campeões do Arco',strength:82,clubs:['Arco Dourado','Mestres do Oriente','Fortaleza Nova','Aurora Suprema']},{name:'Círculo Máximo',strength:89,clubs:['Titãs do Mundo','Clube Meridian','Legião Celeste','Pico Absoluto']},{name:'Cúpula Fenomenal',strength:95,clubs:['Os Inatingíveis','Constelação FC','Trono Universal','Lendas Unidas']}
];
const CAREER_RIVALS=['Dante Vilar','Maya Serrado','Ícaro Valente','Breno das Ilhas','Luna Ferraz','Téo Montanha'];
const SPONSORS=['Chuteira Horizonte','Bebida Pulso','Equipamento Nébula','Banco Aurora','Marca Vértice'];
const VERDICT_TIERS=['Promessa','Homem de Elenco','Ídolo da Torcida','Elite','Ícone','O FENÔMENO'];
const AGENTS=[['Agência Horizonte','Discreto'],['Grupo Órbita','Conectado às ligas'],['Núcleo Vértice','Focado em marketing']];
const COACHES=[['Mauro Saldanha','Equilibrado'],['Iara Valença','Aposta em jovens'],['Dário Campos','Ofensivo'],['Túlio Bruma','Defensivo']];
const MATCH_IMPORTANCE=['PARTIDA COMUM','CLÁSSICO REGIONAL','DECISÃO DE COPA','ESTREIA INTERNACIONAL'];
const COMPETITIONS=['Liga dos Campos Baixos','Copa Nacional da Aurora','Taça Continental do Arco','Eliminatórias de Terralta'];
// Cartas especiais: uma polivalente, uma especialista extrema e uma azarona.
LEGENDS.push(
  {id:'legend-wildcard',name:'Polivalente Prisma',era:'Curinga',style:'Faz tudo sem um pico',attributes:{speed:70,finishing:70,passing:70,dribbling:70,defense:70,physical:70,special:70,weakFoot:70},bonus:'moral'},
  {id:'legend-extreme',name:'Canhão de Uma Nota',era:'Especialista',style:'Finalização extrema',attributes:{speed:31,finishing:99,passing:28,dribbling:37,defense:12,physical:55,special:44,weakFoot:18}},
  {id:'legend-underdog',name:'Azarão do Bairro',era:'Azarão',style:'Cresce quando ninguém espera',attributes:{speed:63,finishing:61,passing:59,dribbling:66,defense:58,physical:62,special:73,weakFoot:75},bonus:'popularity'}
);
