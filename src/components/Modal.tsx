import { Button, Center, Checkbox, Modal, Text } from "native-base";
import React, { useContext, useState } from "react";
import AuthContext from "../contexts/auth";
import api from "../service/auth";

export function Termo() {
  const { user } = useContext(AuthContext);
  async function tecnico() {
    const response = await api.patch("/customer/update", {
      customerId: user.id,
    });
    user.tecnicId = true;
    setShowModal(false);
    alert(response.data.message);
  }
  const [showModal, setShowModal] = useState(false);
  return (
    <Center>
      <Button mt="2" onPress={() => setShowModal(true)}>
        <Text color="white" fontSize="16">
          Deseja se tornar Tecnico ?
        </Text>
      </Button>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        _backdrop={{
          _dark: {
            bg: "coolGray.800",
          },
          bg: "coolGray.800",
        }}
      >
        <Modal.Content maxWidth="350" maxH="312">
          <Modal.CloseButton />
          <Modal.Header>Termo de uso</Modal.Header>
          <Modal.Body>
            A seguir estão descritas as regras aplicáveis à utilização do App
            MeuApp (“Aplicativo”) disponibilizado pela MeuApp, sediada na cidade
            do Rio de Janeiro, (doravante “MeuApp”), em dispositivos móveis com
            sistemas Android e iOS, inicialmente. Ao realizar o cadastro para
            utilização do Aplicativo, o Usuário se submeterá automaticamente às
            regras e condições destes Termos de Uso. DEFINIÇÕES 1.1 App ou
            aplicativo móvel: é um software desenvolvido para ser instalado em
            dispositivo eletrônico móvel, como um telefone celular, um
            smartphone. Este aplicativo pode ser instalado no dispositivo, se o
            aparelho permitir e desde que baixado pelo usuário através de uma
            loja on-line, tais como Google Play ou Apple Store. 1.2 Android: é
            sistema operacional para dispositivos móveis, desenvolvido pelo
            ‘’Francisco Marcello’’, liderada pelo Google. 1.3 iOS: é um sistema
            operacional móvel da Apple Inc desenvolvido originalmente para o
            iPhone. 1.4 Geolocalização: é um sistema capaz de localizar
            dispositivos móveis tais como, mas não limitados a, aparelhos
            celulares, de maneira a enviar mensagens georreferenciadas (alertas
            geolocalizados) ao detectar quando tais terminais móveis (e portanto
            seus usuários destinatários das mensagens georreferenciadas)
            estiverem geograficamente próximos à um determinado ponto geográfico
            ou dentro de uma determinada região delimitada por uma cerca virtual
            chamada de “geofence”. Tais mensagens georreferenciadas (alertas
            geolocalizados) podem ter várias finalidades inclusive, por exemplo,
            o envio de mensagens promocionais de estabelecimentos comerciais.
            1.5 Tecnologia Push: é um sistema de distribuição de conteúdo da
            Internet em que a informação sai de um servidor para um cliente, com
            base em uma série de parâmetros estabelecidos pelo cliente, também
            chamado de “assinatura”. No caso deste Termo de Uso trata-se de
            conteúdo a ser encaminhado como alertas, lembretes ou mensagens ao
            usuário que tiver o aplicativo MeuApp instalado. 1.6 Parceiros:
            Empresas parceiras da MeuApp ou coligadas. 1.7 Usuários: Todas as
            pessoas, sem restrição, poderão baixar e usar o aplicativo MeuApp.
            Os Usuários terão acesso aos recursos: Criar um círculo de cuidados,
            convidando pessoas relacionadas ao Idoso – familiares, cuidadores e
            profissionais de saúde (médico, fisioterapeuta, nutricionista);
            Gerenciar uma agenda diária de cuidados, relacionada a administração
            de medicamentos, monitoramento de medidas vitais, e outros eventos;
            Gerenciar quem participa da equipe de cuidado e quem está
            responsável pelo cuidado a cada momento; Emitir lembretes de tarefas
            a serem realizadas e alertas em situações indesejáveis. DA BAIXA
            (DOWNLOAD) DO APP MeuApp 2.1 Para que o usuário possa baixar o
            aplicativo em seu aparelho celular, deverá se certificar se possui o
            Android ou o iOS. Não haverá outra forma de acessar o App MeuApp que
            não seja pelo smartphone. 2.2 No tutorial de utilização do
            aplicativo será apresentado o aceite do “Termo de Uso e Politica de
            Privacidade” aos usuários. O aceite do termo é obrigatório para uso
            do aplicativo, não sendo possível prosseguir sem aceitá-lo. DA
            GRATUIDADE E COBRANÇA DO APP MeuApp 3.1 Para a utilização e baixa
            (download) do App MeuApp não haverá custo nenhum, tampouco para
            eventuais atualizações. 3.2 Para a versão Premium haverá uma
            cobrança mensal ao usuário que queira utilizá-la. Não é obrigatória
            a utilização da versão Premium, cabendo ao usuário a decisão de
            baixa-la para seu dispositivo móvel. DO CADASTRO E USO DO APP MeuApp
            4.1 O cadastro para uso do Aplicativo é realizado no primeiro acesso
            do Usuário que deverá escolher entre o login por email ou pelo seu
            usuário já existente no Facebook. 4.2 O Usuário ao realizar o
            cadastro sobre suas informações pessoais é o responsável pelo
            correto preenchimento e manutenção das referidas informações. O
            “Cadastro” é composto por dados obrigatórios tais como nome, email e
            senha de acesso ao aplicativo MeuApp e opcionais tais como telefone
            e foto. O usuário poderá alterar suas informações cadastrais no
            próprio aplicativo. 4.3 Será permitido um único cadastramento por
            Usuário, devendo o acesso, visualização e uso do Aplicativo ser
            feito pelo Usuário em caráter pessoal e intransferível. 4.4 No caso
            de menores de 18 (dezoito) anos ou outras pessoas que necessitem de
            representação na forma da lei, o cadastramento deverá ser realizado
            com a assistência dos pais ou dos representantes legais. 4.5 Não é
            de responsabilidade da MeuApp o caso de um Usuário se utilizar do
            cadastro de outro Usuário. 4.6 Toda e qualquer ação executada ou
            conteúdo publicado pelo Usuário durante o uso do aplicativo será de
            sua exclusiva e integral responsabilidade, devendo isentar e
            indenizar a MeuApp de quaisquer reclamações, prejuízos, perdas e
            danos causados, em decorrência de tais ações ou manifestações. 4.7 O
            Usuário autoriza a MeuApp ou terceiros por ela indicados, a
            utilizar, por prazo indeterminado, as informações fornecidas no ato
            do cadastro e durante o uso do aplicativo, para fins estatísticos e
            envio de material publicitário, newsletters, informes, etc . 4.8 A
            MeuApp se reserva o direito de incluir, excluir ou alterar os
            conteúdos e funcionalidades do aplicativo, bem como suspendê-lo
            temporariamente ou cancelá-lo, a qualquer momento, independentemente
            de aviso prévio ao Usuário. Da mesma forma, poderá modificar estes
            Termos de Uso, cuja versão mais recente estará sempre disponível
            para consulta no próprio aplicativo. 4.9 O Usuário é exclusivamente
            responsável por todo e qualquer conteúdo por ele enviado ou
            publicado através do Aplicativo. Ao enviar/publicar o conteúdo, o
            Usuário garante que ele não viola quaisquer direitos de terceiros ou
            leis vigentes e concorda em manter a MeuApp isenta de quaisquer
            reclamações judiciais ou extrajudiciais de terceiros. 4.10 A MeuApp
            se exime de toda e qualquer responsabilidade pelos danos e prejuízos
            de qualquer natureza que possam decorrer do acesso, interceptação,
            eliminação, alteração, modificação ou manipulação, por terceiros não
            autorizados, dos dados do usuário durante a utilização do
            aplicativo. 4.11 As informações solicitadas ao Usuário no momento do
            cadastro serão utilizadas pela MeuApp somente para os fins previstos
            nestes Termos de Uso e em nenhuma circunstância, tais informações
            serão cedidas ou compartilhadas com terceiros, exceto por ordem
            judicial ou de autoridade competentes. RENÚNCIA A GARANTIAS E
            LIMITAÇÃO DE RESPONSABILIDADE 5.1. A MeuApp responde pelos seus
            serviços e pelo gerenciamento do aplicativo em relação aos usuários,
            porém, a qualidade e quantidade dos produtos e serviços oferecidos
            por nossos parceiros é de responsabilidade exclusiva destes últimos.
            5.2. O Usuário é responsável pela(s) atualização(ões) do App MeuApp.
            Caso não o faça e tiver problema na sua utilização, a MeuApp estará
            isenta de responsabilidade por quaisquer perdas e danos. 5.3 a
            MeuApp não declara ou garante que o Aplicativo será livre de perdas,
            defeitos, ataques, vírus, interferências, atividades de hackers ou
            outra intrusão de segurança, e a MeuApp renuncia a qualquer
            responsabilidade com relação a isso por ser culpa de terceiros. DA
            PROPRIEDADE INTELECTUAL 6.1. O Usuário concorda que os serviços
            prestados pela MeuApp, incluindo, sem limitação, o Aplicativo com
            interface de usuário, integração com outros serviços ou aplicativos,
            scripts e software utilizados para implementá-lo contêm informações
            exclusivas de propriedade da MeuApp e/ou seus licenciantes e são
            protegidos pelas leis de propriedade intelectual e outras leis
            aplicáveis, incluindo, sem limitação, direitos autorais. 6.2. O
            Usuário concorda que não utilizará tais informações ou materiais
            exclusivos de nenhuma forma, exceto para uso dos Serviços em
            conformidade com este Termo de Uso. Nenhuma parte dos serviços
            poderá ser reproduzida de qualquer forma ou por qualquer meio,
            exceto conforme expressamente permitido por estes termos. 6.3. Sem
            prejuízo de qualquer disposição deste Termo, a MeuApp e seus
            representantes se reservam o direito de alterar, suspender, remover
            ou desabilitar o acesso ao aplicativo, conteúdos ou outros
            materiais, a qualquer momento, sem aviso ou ônus. Em hipótese
            alguma, a MeuApp será responsabilizada por ter realizado tais
            alterações. A MeuApp poderá ainda impor limites sobre o uso de ou
            acesso a determinadas funcionalidades ou partes do serviço do
            aplicativo, em qualquer caso e sem aviso ou responsabilidade. 6.4.
            Todos os direitos autorais relacionados ao App Gero60 e software
            relacionados são de propriedade da MeuApp ou seus licenciantes, que
            reservam todos os seus direitos previstos em lei e equidade. A
            utilização do software ou qualquer parte dos serviços do App MeuApp,
            exceto para o uso permitido neste termo, é estritamente proibida e
            viola os direitos de propriedade intelectual de terceiros, podendo
            sujeitá-lo a penalidades civis e criminais, incluindo possíveis
            danos patrimoniais por violação de direitos autorais. 6.5. A MeuApp,
            o logotipo da MeuApp, a marca MeuApp, e outras marcas, marcas de
            serviço, gráficos e logos usados em relação ao App MeuApp são marcas
            registradas da MeuApp no Brasil e/ou em outro país. O Usuário não
            recebe qualquer direito ou licença com relação a quaisquer das
            marcas mencionadas e ao uso destas. DA POLITICA DE PRIVACIDADE 7.1.
            Informações pessoais: Os dados pessoais inseridos no Aplicativo
            serão armazenados em nossas bases, em ambiente seguro, garantindo o
            sigilo e confidencialidade dos mesmos. 7.2. Estatísticas de
            audiência: As informações relativas à audiência, como por exemplo,
            tráfego de Sites, navegação dos Usuários e páginas mais visitadas,
            destina-se a levantamentos estatísticos, visando o aprimoramento
            contínuo de nossos aplicativos e melhor atendimento das necessidades
            de seus Usuários. 7.3. É importante ressaltar que o Usuário deve
            tomar certos cuidados ao acessar a área segura, tais como: (i) o uso
            de senhas sequenciais ou que não contenham dados pessoais e (ii)
            troca de senha de forma periodica. COMPARTILHAMENTO DE INFORMAÇÃO
            8.1. O usuário, por meio deste regulamento, concorda e aceita que a
            MeuApp poderá compartilhar essas informações com terceiros se
            requerido pela lei ou por decreto judicial. Para ajudar a fornecer
            nossos serviços ocasionalmente fornecemos informações a outras
            empresas que trabalham conosco, como, por exemplo: Proteção ou
            defesa dos nossos direitos legais ou de propriedade, ou de nossos
            Usuários. Personalização do conteúdo e anúncios de acordo com perfil
            e preferências dos Usuários. Fornecimento dos programas de
            fidelização, base de Usuários, perfis e padrões de uso. 8.2. Suas
            escolhas e informações pessoais podem ser atualizadas a qualquer
            momento em sua conta. Para fazer quaisquer atualizações ou
            alterações, revisite nosso Aplicativo. 8.3. A MeuApp irá, de tempos
            em tempos, à medida que os usuários forem alterando as suas
            informações, ou por iniciativa da MeuApp, coletar informação que
            pode ser utilizada para melhoria do próprio aplicativo. Esta
            informação será armazenada de forma anônima e não será associada a
            seu nome ou Conta. 8.4 A Gero60 não vende ou aluga as informações
            pessoais dos usuários para terceiros. DO CANCELAMENTO 9.1 O usuário
            poderá, a qualquer tempo, desinstalar o App MeuApp, sem que isto
            gere para qualquer das partes o direito de indenização ou qualquer
            outra quantia. 9.2 Sem prejuízo das demais sanções legais e daquelas
            aqui previstas, a MeuApp poderá, a seu critério, notificar,
            suspender e/ ou cancelar o cadastro do Usuário, rescindir o presente
            Termo e/ ou Conta, revogar a licença do software, impedir o acesso
            ao aplicativo (ou qualquer parte dele) a qualquer tempo, definitiva
            ou temporariamente, nos seguintes casos, exemplificando, mas não se
            limitando: a) Descumprimento de quaisquer disposições deste Termo de
            Uso; b) Verificação de cadastro duplicado; c) Verificação de novo
            cadastro realizado por Usuário que teve seu cadastro cancelado e/ou
            suspenso; d) Constatação de fraude ou tentativa de fraude; e/ ou, e)
            Fornecimento de informações solicitadas incorretas e/ ou inverídicas
            ou ainda se negar a prestar eventuais informações adicionais
            solicitadas pelo Site. 9.3. Com o término, por qualquer motivo, da
            relação entre a MeuApp e o Usuário. 9.4. A MeuApp reserva o direito
            de alterar, suspender ou interromper o App MeuApp (ou qualquer parte
            ou conteúdo) a qualquer tempo, com ou sem aviso prévio, e a MeuApp
            não será responsável perante o Usuário ou qualquer terceiro caso
            exerça tais direitos. DISPOSIÇÕES GERAIS 10.1 A MeuApp reserva o
            direito de, a qualquer tempo, modificar o presente Termo de Uso e
            Política de Privacidade e impor termos ou condições novos ou
            adicionais sobre seu uso do aplicativo. Tais modificações e termos e
            condições adicionais terão eficácia imediata e serão incorporados a
            este Termo. 10.2 Se qualquer termo ou condição do nosso Acordo for
            considerado inválido, ilegal ou inaplicável, as partes concordam que
            tal termo ou condição poderá ser excluído e o restante do Acordo
            deverá continuar em vigorando por prazo indeterminado. 10.3 A MeuApp
            poderá, sem prévio aviso, bloquear e cancelar o acesso ao aplicativo
            quando verificar que o Usuário praticou algum ato ou mantenha
            conduta que (i) viole as leis e regulamentos federais, estaduais
            e/ou municipais, (ii) contrarie as regras destes Termos de Uso, ou
            (iii) viole os princípios da moral e dos bons costumes. 10.4 Este
            Termo de Uso e Política de Privacidade serão regidos e interpretados
            de acordo com as leis do Brasil. Para dirimir eventuais dúvidas
            acerca do presente instrumento, bem como qualquer evento relacionado
            à utilização de nossos serviços, fica eleito o Foro Central, da
            Comarca da Capital do Estado do Rio de Janeiro para dirimir
            quaisquer questões decorrentes destes Termos de Uso.
            <Checkbox mr="2" mt="2" value="two">
              Aceito os termos
            </Checkbox>
          </Modal.Body>

          <Modal.Footer justifyContent="center">
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Não Aceito
              </Button>
              <Button onPress={tecnico}>Aceito</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
}
