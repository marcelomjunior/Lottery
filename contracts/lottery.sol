pragma solidity ^0.4.17;

contract Lottery {
    address public menager;
    address[] public players;
    uint256 private valueBat = 0;
    
    function Lottery() public {
        menager = msg.sender;
    }
    // Entrada de novos jogadores
    function enter() public payable {
        require(msg.value > .01 ether);
        players.push(msg.sender);
        valueBat += msg.value;
    }
    // Gerando números aleatórios
    function random() private view returns(uint) {
        return uint(keccak256(block.difficulty, now, players));
    }
    // Escolhendo o Jogador vencedor aleatóriamente
    function pickWinner() public restricted {
        uint index = random() % players.length;
        players[index].transfer(this.balance);
        players = new address[](0);
        valueBat = 0;
    }
    // Modificador feito para restringir o acesso de algumas funções para que somente o dono do contrato altere.
    modifier restricted() {
        require(msg.sender == menager);
        _;
    }
    // Mostra todos os players participantes da loteria
    function getPlayers() public view returns (address[]) {
        return players;
    }
    // Mostra o valor da total da premiação
    function premiumValue() public view returns (uint256 totalAwards) {
        return valueBat;
    }
}