export function paintBgHome(clubData) {
    const btnSelectTeam = document.querySelectorAll('.clubSelectBtn');
    const teamNameDisplay = document.getElementById('teamName');

    btnSelectTeam.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            let selectedClub = clubData.clubes[index];
            
            if (selectedClub) {
                console.log(selectedClub.name); 
                
                document.body.style.backgroundColor = selectedClub.colors; // Supondo que o objeto do clube tenha uma propriedade 'colors' com informações de cor, e 'primary' seja a cor principal


            } else {
                console.log("Clube não encontrado com o ID:", index);
            }
        });
    });
    
}
