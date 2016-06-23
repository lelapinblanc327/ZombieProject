#pragma strict
var zombieControl : Animator;
var walkBool : boolean = false;

function Start () 
{
	zombieControl = GetComponent(Animator);
}

function Update () 
{
	if(Input.GetKeyDown("b"))
	{
		walkBool = !walkBool;
		zombieControl.SetBool("SwitchWalk", walkBool);
	}

}