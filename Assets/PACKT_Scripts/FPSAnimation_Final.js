#pragma strict
var thisAnimator : Animator;
var bulletPrefab : GameObject;
var muzzle : Transform;

var horizontalSpeed : float = 0.0;
var itemWeight : float;

function Start () 
{
	thisAnimator = GetComponent(Animator);
}

function Update()
{
	horizontalSpeed = Input.GetAxis("Horizontal");
	thisAnimator.SetFloat("HSpeed",horizontalSpeed);

	if(Input.GetButtonDown("Fire1"))
	{
		thisAnimator.SetTrigger("Shooting");
		Shoots();
	}
}

function Pick(objectWeight : float)
{
	thisAnimator.SetTrigger("Picking");
	itemWeight = objectWeight;
	thisAnimator.SetFloat("Weighting", objectWeight);
	
}

function Shoots()
{
	Debug.Log("You fired");
	var theBullet = Instantiate(bulletPrefab, muzzle.position, muzzle.rotation);
	theBullet.GetComponent.<Rigidbody>().AddRelativeForce(0, 0, 3000);
}

