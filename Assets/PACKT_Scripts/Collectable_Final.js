var sound : AudioClip;
var increase : int = 1;
var playerObj : GameObject;
var pickingCamera : GameObject;
var playerCamera : Transform;
var triggered : boolean = false;
var headBone : Transform;
var objectWeight = 0.25;

function OnTriggerEnter (other : Collider)
{
	if(triggered == false)
	{
		triggered = true;
		var playerState = playerObj.GetComponent(PlayerStatus_Final);
		var playerAnim = playerObj.GetComponent(FPSAnimation_Final);
		
		playerState.AddHealth(increase);
		playerAnim.Pick(objectWeight);
		RunCam();
		
		if (sound)
		{
			AudioSource.PlayClipAtPoint(sound, transform.position);
		}
		
	}
}

function RunCam()
{
	var pickTrans = transform;
	var addCamObj : GameObject = Instantiate(pickingCamera, headBone.position, playerCamera.rotation);
	addCamObj.transform.parent = headBone.transform;
	addCamObj.transform.GetChild(0).SendMessage("SentTarget", pickTrans);
	
	yield WaitForSeconds(0.5);
	Remove();
}

function Remove()
{
	Debug.Log("You got it");
	triggered = false; //debug only and then delete
	Destroy(gameObject);
}


	
