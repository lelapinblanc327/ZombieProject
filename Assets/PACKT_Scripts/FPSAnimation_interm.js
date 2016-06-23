#pragma strict
var thisAnimator : Animator;

var bulletPrefab : GameObject;
var muzzle : Transform;


function Start () 
{
	thisAnimator = GetComponent(Animator);
}

function Update()
{
	if(Input.GetButtonDown("Fire1"))
	{
		thisAnimator.SetTrigger("Shooting");
		Shoot();
	}
}

function Shoot()
{
	var theBullet = Instantiate(bulletPrefab, muzzle.position, muzzle.rotation);
	theBullet.GetComponent.<Rigidbody>().AddRelativeForce(0, 0, 3000);
}

function Pick()
{
	thisAnimator.SetTrigger("Picking");
}