#pragma strict
var bulletPrefab : GameObject;
var bulletVelocity : float = 1000.0;
var muzzle : Transform;

function Update () 
{
	//var firedPosition = Vector3(transform.position.x, transform.position.y, transform.position.z - muzzleOffset);
	
	if(Input.GetButtonDown("Fire1"))
	{
		var firedBullet = Instantiate(bulletPrefab, muzzle.position, muzzle.rotation);
		firedBullet.GetComponent.<Rigidbody>().AddForce(transform.forward * bulletVelocity);
	}
}