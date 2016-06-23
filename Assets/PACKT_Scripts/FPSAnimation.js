#pragma strict
var thisAnimator : Animator;

function Start () 
{
	thisAnimator = GetComponent(Animator);
}

function Update()
{
	if(Input.GetButton("Fire1"))
	{
		thisAnimator.SetTrigger("Shooting");
		Shoot();
	}
}

function Shoot()
{

}

function Pick()
{
	thisAnimator.SetTrigger("Picking");
}